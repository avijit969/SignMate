import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as mime from 'react-native-mime-types';
import ScreenWrapper from '@/components/ScreenWrapper';
import { theme } from '@/constants/theme';
import { wp } from "@/helpers/common";

export default function Sign() {
  const [videoUri, setVideoUri] = useState("");
  const [predict, setPredict] = useState("");
  const [loading, setLoading] = useState(false);

  const pickVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
      await uploadVideo(result.assets[0].uri);
    }
  };

  const uploadVideo = async (uri) => {
    setLoading(true);
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileUri = fileInfo.uri;
      const fileType = mime.lookup(fileUri) || 'video/mp4';

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        type: fileType,
        name: fileUri.split('/').pop(),
      });

      const response = await fetch('https://testfastapi-2apn.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPredict(result.prediction);
      } else {
        console.error('Failed to get prediction');
        Alert.alert('Error', 'Failed to get prediction');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Upload Error', 'An error occurred while uploading the video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="">
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={pickVideo} disabled={loading}>
          <Text style={styles.text}>Record Video</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <>
            <Text style={styles.signText}>Sign For the Uploaded video is 👇</Text>
            {predict && (
              <View>
                <View style={styles.labelBackground}>
                  <Text style={styles.subtitleBelow}>{predict}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  signText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    color: theme.colors.dark,
    fontWeight: theme.fonts.semibold,
  },
  labelBackground: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: wp(30),
    borderRadius: theme.radius.sm,
    alignContent: 'center',
    alignItems: 'center',
  },
  subtitleBelow: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
});
