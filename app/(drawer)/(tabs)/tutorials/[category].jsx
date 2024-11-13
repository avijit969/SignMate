import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video } from 'expo-av';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import BackButton from '@/components/BackButton';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import { hp, wp } from '@/helpers/common';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';


const Tutorials = () => {
    const { category } = useLocalSearchParams();
    const router = useRouter();

    const [tutorialsData, setTutorialsData] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSlowMotion, setIsSlowMotion] = useState(false);
    const { t } = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('learning')
                    .select('label, video_url, label_image')
                    .eq('category', category.toLowerCase())
                    .order('label', { ascending: true });

                if (error) {
                    throw error;
                }
                setTutorialsData(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const handleNextVideo = () => {
        if (currentVideoIndex < tutorialsData.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePreviousVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    const toggleSlowMotion = () => {
        setIsSlowMotion(!isSlowMotion);
    };

    const currentTutorial = tutorialsData[currentVideoIndex];

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <BackButton router={router} />
                <Text style={styles.headerText}>{t(`learning_page_by_categories.learn_about_${category.toLowerCase()}`)}</Text>
            </View>

            {loading && <ActivityIndicator size="large" style={styles.loader} />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {!loading && !error && currentTutorial && (
                <View style={styles.content}>
                    {currentTutorial.label_image && (
                        <Image source={currentTutorial.label_image}
                            style={styles.image}
                            contentFit="cover" />
                    )}
                    {currentTutorial.label_image && <Text style={styles.label}>{currentTutorial.label}</Text>}
                    <View style={styles.videoContainer}>
                        <Video
                            source={{ uri: currentTutorial.video_url }}
                            rate={isSlowMotion ? 0.5 : 1.0}
                            volume={1.0}
                            isMuted={true}
                            isLooping={true}
                            resizeMode="cover"
                            shouldPlay
                            style={styles.video}
                        // useNativeControls
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonStyle={styles.previousButtonStyle}
                            title={t('learning_page_by_categories.previous_sign')}
                            onPress={handlePreviousVideo}
                            disabled={currentVideoIndex === 0}
                        />
                        <Button
                            buttonStyle={styles.nextButtonStyle}
                            title={t('learning_page_by_categories.next_sign')}
                            onPress={handleNextVideo}
                            disabled={currentVideoIndex >= tutorialsData.length - 1}
                        />
                    </View>


                </View>
            )}
            <Pressable onPress={toggleSlowMotion} style={styles.speedContainer} >
                {currentTutorial && (<View style={styles.speedImage}>
                    <Image source={isSlowMotion ? "https://img.icons8.com/plasticine/480/turtle.png" : "https://img.icons8.com/carbon-copy/480/turtle.png"}
                        style={styles.image}
                        contentFit="cover" />
                </View>)}
            </Pressable>
            {!loading && !error && !currentTutorial && (
                <Text style={styles.noVideoText}>No videos available for this category.</Text>
            )}
        </ScreenWrapper>
    );
};

export default Tutorials;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        color: theme.colors.dark,
        fontWeight: theme.fonts.semibold,
        marginLeft: 10,
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    label: {
        marginTop: 10,
        backgroundColor: "#f7dc6f",
        fontSize: hp(2.5),
        borderRadius: theme.radius.md,
        marginBottom: 10,
        width: wp(24),
        height: wp(6),
        fontWeight: theme.fonts.semibold,
        textAlign: "center",
        paddingVertical: hp(1.5)
    },
    image: {
        width: wp(15),
        height: wp(15),
    },
    videoContainer: {
        width: '100%',
        height: hp(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: wp(35),
        height: '100%',
        borderRadius: theme.radius.lg,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    noVideoText: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    nextButtonStyle: {
        padding: 10,
    },
    previousButtonStyle: {
        padding: 10,
        backgroundColor: '#bb8fce'
    },

    speedImage: {
        width: wp(5),
    },
    speedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(15),
        marginLeft: 10
    }
});
