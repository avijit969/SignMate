import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { supabase } from '../../../lib/supabase';
import { Video } from 'expo-av';
import { theme } from '../../../constants/theme';
import Button from '../../../components/Button';
import { wp } from '../../../helpers/common';
const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('practice')
          .select('*');

        if (error) {
          throw error;
        }
        setQuestions(data);

      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.message || 'Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionPress = (selectedIndex) => {
    setSelectedOption(selectedIndex);
    setShowCheckButton(true);
  };

  const handleCheckAnswer = () => {
    const correctAnswerIndex = questions[currentQuestionIndex].correct_answer_option;
    const isCorrect = selectedOption === correctAnswerIndex;
    setCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowNextButton(true);
    setShowCheckButton(false);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCorrect(null);
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setCorrect(null);
      setShowNextButton(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!loading && !error && questions.length > 0 ? (
          <>
            {currentQuestionIndex < questions.length ? (
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
                <Video
                  source={{ uri: questions[currentQuestionIndex].question_video_url }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  style={styles.video}
                  isLooping={true}
                />
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.option,
                      selectedOption === 1 && styles.selectedOption,
                      correct === true && selectedOption === 1 && styles.correctOption,
                      correct === false && selectedOption === 1 && styles.incorrectOption,
                    ]}
                    onPress={() => handleOptionPress(1)}
                    disabled={showNextButton}
                  >
                    <Image source={{ uri: questions[currentQuestionIndex].option1_image }} style={styles.optionImage} />
                    <Text style={styles.optionText}>{questions[currentQuestionIndex].option1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.option,
                      selectedOption === 2 && styles.selectedOption,
                      correct === true && selectedOption === 2 && styles.correctOption,
                      correct === false && selectedOption === 2 && styles.incorrectOption,
                    ]}
                    onPress={() => handleOptionPress(2)}
                    disabled={showNextButton}
                  >
                    <Image source={{ uri: questions[currentQuestionIndex].option2_image }} style={styles.optionImage} />
                    <Text style={styles.optionText}>{questions[currentQuestionIndex].option2}</Text>
                  </TouchableOpacity>
                </View>
                {showCheckButton && (
                  <Button title="Check Answer" onPress={handleCheckAnswer} />
                )}
                {showNextButton && (
                  <>
                    <Button title="Next" onPress={handleNextQuestion} />
                    {currentQuestionIndex > 0 && (
                      <View style={styles.previousBtn}>
                        <Button title="Previous" onPress={handlePreviousQuestion} />
                      </View>
                    )}
                  </>
                )}
                {showNextButton && selectedOption && (
                  <Text style={styles.feedbackText}>
                    {correct ? 'Correct Answer!' : 'Incorrect Answer!'}
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Practice Complete!</Text>
                <Text style={styles.scoreText}>Your Score is: {score} / {questions.length}</Text>
                <View>

                </View>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.noQuestionsText}>No questions available.</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Practice;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: wp(2.5),
    fontWeight: theme.fonts.semibold,
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: theme.radius.xl
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 15
  },
  option: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  optionImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noQuestionsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  previousBtn: {
    marginTop: 6
  }
});
