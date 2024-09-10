import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { wp } from '../../helpers/common';
import { theme } from '../../constants/theme';

/**
 * The FAQs component displays frequently asked questions with a toggle to show or hide answers.
 * @returns {React.ReactElement} The JSX element representing the FAQs component
 */
const FAQs = () => {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const faqs = [
    {
      question: "What is the primary purpose of this Learning App?",
      answer: "The primary purpose of the app is to support deaf and mute by providing an interactive platform to learn alphabets, numbers, words, sentences, basic Mathematics, and Science using Indian Sign Language. The app also facilitates communication through text and speech to sign language conversion and vice versa."
    },
    {
      question: "Is the application available for offline use?",
      answer: "No, the application is not available for offline use. This application works with an internet connection, preferably a stable one."
    },
    {
      question: "Does your app offer lessons and exercises to improve the user’s sign language?",
      answer: "Yes. Our application has lessons according to categories. There is also a practice session to evaluate yourself and see your score."
    },
    {
      question: "Who can use this app?",
      answer: "The app is designed for students, teachers, parents, and HR professionals. It provides the educational needs of deaf and mute individuals, offers teaching tools for teachers, supports parents, and assists HR professionals in inclusive hiring and communication practices. Additionally, anyone interested in learning sign language can use this app."
    },
    {
      question: "Can parents who do not know sign language use the app?",
      answer: "Yes, the app is designed to assist parents who may not know sign language. It provides features that convert text to sign language and vice versa, allowing parents to support their children’s learning at home."
    },
    {
      question: "Does the app support learning beyond the classroom?",
      answer: "Absolutely. The app is designed to extend learning beyond the classroom, providing digital resources that students can use to practice and strengthen their lessons at home."
    },
    {
      question: "What platforms is the app available on?",
      answer: "The app is intended to be available on both Android and iOS platforms. Users can download it from the respective app stores once it is officially launched. For now, the links to download for both Android and iOS users are provided in the documentation (user manual or guide)."
    },
    {
      question: "What types of exercises are included in the app?",
      answer: "The app currently includes multiple choice questions. Further additions will be made shortly. These exercises help boost learning and allow students to practice."
    },
  ];

  const toggleAnswer = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Display the FAQs with your own design */}
      <View style={styles.questions}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{index + 1}. {faq.question}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleAnswer(index)}
              >
                <Text style={styles.buttonText}>{visibleIndex === index ? '-' : '+'}</Text>
              </TouchableOpacity>
            </View>
            {visibleIndex === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.gray,
  },
  questions: {
    marginTop: 10,
  },
  faqContainer: {
    marginBottom: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontSize: 18,
    fontWeight: theme.fonts.semibold,
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginLeft: 10,
    width: wp(5),
    height: wp(5),
  },
  buttonText: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answer: {
    fontSize: 16,
    marginTop: 4,
    paddingLeft: 10,
  },
});
