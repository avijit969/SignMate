import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';  // Import the custom alert
import { supabase } from '../lib/supabase'
export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onSubmit = async () => {
    if (!email || !password || !name) {
      setAlertMessage("Please fill all fields");
      setAlertVisible(true);
      return;
    }
    console.log(name);

    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    }
    )
    console.log('session', session);
    console.log('Error', error);
    if(session){
      router.push('/login')
    }
    if (error) {
      setAlertMessage(error?.message);
      setAlertVisible(true);
    }
    setLoading(false)
  };

  return (
    <ScreenWrapper>

      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <BackButton router={router} />

          {/* welcome message */}
          <View>
            <Text style={styles.welcomeText}>let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>

          {/* input form */}
          <View style={styles.form}>
            <Text style={{ fontSize: hp(2), color: theme.colors.text }}>
              Please fill the details to create an account
            </Text>
            <Input
              icon={<Icon name={'user'} size={26} strokeWidth={1.6} />}
              placeholder="Enter your name"
              onChangeText={setName}
            />
            <Input
              icon={<Icon name={'email'} size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              onChangeText={setEmail}
            />
            <Input
              icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
              placeholder="Enter your password"
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* login button */}
            <Button title='Sign Up' loading={loading} onPress={onSubmit} />
          </View>

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={()=>router.push('login')}>
              <Text style={[styles.footerText, { color: theme.colors.primaryDark }, { fontWeight: theme.fonts.semibold }]} >Log In</Text>
            </Pressable>
          </View>
        </View>

        {/* Custom Alert */}
        <Alert
          visible={alertVisible}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(2)
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
  },
  form: {
    gap: 25
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    gap: 5
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(2)
  }
});
