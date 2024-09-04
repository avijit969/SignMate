import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import ScreenWrapper from '../components/ScreenWrapper'
import Button from '../components/Button'
import { useRouter } from 'expo-router'

const welcome = () => {
    const router = useRouter()
    return (
        <ScreenWrapper bg='white'>
            <StatusBar style='dark' />
            <View style={styles.container}>
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.jpg')} />
                {/* title */}
                <View style={{ gap: 4 }}>
                    <Text style={styles.title}>SignMate</Text>
                    <Text style={styles.punchLine}>Welcome to SignMate where learning meets indian sign language</Text>
                </View>
                {/* footer */}
                <View style={styles.footer} >
                    <Button title='Getting Started'
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => { router.push('signUp') }}
                    />
                </View>

                <View style={[styles.buttonTextContainer]}>
                    <Text style={[styles.loginText]} >
                        Already have an account!
                    </Text>
                    <Pressable onPress={() => router.push('login')}>
                        <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>
                            logIn
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp(40),
        width: wp(100),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchLine: {
        textAlign: 'center',
        paddingHorizontal: wp(4),
        fontSize: hp(2.4),
        color: theme.colors.text
    },
    footer: {
        gap: 30,
        width: "100%"
    },
    buttonTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(2)
    }
})