import React, { useEffect } from 'react'
import { Stack, Tabs, useRouter } from 'expo-router'
import { supabase } from '../lib/supabase'
import { StatusBar } from 'expo-status-bar'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, setUserData } from '../features/auth/authSlice'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import { getUserData } from '../services/getUserData'
import { I18nextProvider } from 'react-i18next'
import i18n from '../utils/i18n'

const _layout = () => {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar style='dark' />
        <I18nextProvider i18n={i18n}>
          <MainLayout />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  )
}

const MainLayout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // Dispatch login action with session user
        dispatch(login(session.user));

        const data = await getUserData(session.user.id);
        if (data) {
          dispatch(setUserData(data));
        }
        // Navigate to home screen
        router.replace('/home');
      } else {
        // Dispatch logout action
        dispatch(logout());

        // Navigate to welcome screen
        router.replace('/welcome');
      }
    });
  }, [dispatch, router]);

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='signUp' options={{ headerShown: false }} />
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout