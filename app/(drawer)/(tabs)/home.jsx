import { StyleSheet, TextInput, View, Text, Alert, Keyboard } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import React, { useRef, useState } from 'react';
// import Avatar from '../../../components/Avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import useControls from 'r3f-native-orbitcontrols';
import { hp, wp } from '../../../helpers/common';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Button from '../../../components/Button';
import { supabase } from '../../../lib/supabase';
import CustomAlert from '../../../components/Alert';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';


export default function Home() {
  // const [OrbitControls] = useControls();
  const [inputValue, setInputValue] = useState('Namaste🙏');
  const [load3d, setLoad3d] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://kutjyqwwolesoiyxibpc.supabase.co/storage/v1/object/public/sign_videos/public/NAMASTE_1725303053359.mp4");
  const [label, setLabel] = useState('');
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return <CustomAlert message={error.message} visible={true} />;
    }
  };

  const fetchVideoData = async () => {
    const { data, error } = await supabase
      .from('learning')
      .select('label, video_url')
      .eq('label', inputValue.toUpperCase())
      .single();

    if (error) {
      // console.error('Error fetching video:', error);
      setAlertMessage(`For ${inputValue} sign is not available 🥲`);
      setAlertVisible(true);
      setVideoUrl(null);
      setLabel('');
    }

    if (data) {
      setVideoUrl(data.video_url);
      setLabel(data.label);
    }
  };

  const handleTranslate = () => {

    Keyboard.dismiss();

    fetchVideoData();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Uncomment the button below to add a logout button */}
        {/* <Button buttonStyle={{ backgroundColor: 'red' }} title='Logout' onPress={handleLogout} /> */}
        <View>
          <Text style={styles.introText}>Hello {userData?.name} 👋 </Text>
        </View>
        <StatusBar style='dark' />
        {load3d && (
          <Canvas>
            <OrbitControls enabled={true} />
            <color attach="background" />
            <ambientLight intensity={1} />
            <Avatar />
          </Canvas>
        )}
        {/* Video player */}
        <View style={styles.videoContainer}>
          {videoUrl ? (
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={styles.backgroundVideo}
              useNativeControls={false}
              resizeMode="contain"
              isLooping={true}
              shouldPlay={true}
              rate={playbackRate}
              isMuted={true}
            />
          ) : (
            <Text style={styles.noVideoText}>Sign is not available for this word🥹</Text>
          )}
        </View>

        {/* label below the video for the input text */}
        {inputValue &&
          <View style={styles.labelBackground}>
            <Text style={styles.subtitleBelow}>{inputValue}</Text>
          </View>
        }

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Type To Translate'
              placeholderTextColor="#242723"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Icon
              name="arrow-forward"
              size={28}
              color="#fff"
              style={styles.icon}
              onPress={handleTranslate}
            />
          </View>
        </View>
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  introText: {
    fontSize: 18,
    fontWeight: theme.fonts.semibold,
    padding: 10
  },
  subtitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#242723',
    textAlign: 'center',
    marginVertical: 10,
  },
  videoContainer: {
    width: '100%',
    height: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: wp(50),
    height: '100%',
    borderRadius: theme.radius.lg,
    paddingHorizontal: 12
  },
  subtitleBelow: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  labelBackground: {
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: wp(30),
    borderRadius: theme.radius.sm,
    alignContent: 'center',
    alignItems: 'center'
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderColor: '#a1e05e',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#57ee38',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    marginLeft: 10,
  },
  noVideoText: {
    fontSize: 18,
    color: '#242723',
  },
});
