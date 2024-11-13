import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Icon from '@/assets/icons';
import { theme } from '../../constants/theme';
import { wp } from '../../helpers/common';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { t } = useTranslation()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer

        screenOptions={{
          drawerLabelStyle: styles.drawerLabelStyle,
        }}
      >
        <Drawer.Screen
          name='(tabs)'
          options={{
            headerShown: false,
            title: t('drawer.home'),
            drawerIcon: ({ color }) => <Icon name={'home'} size={26} strokeWidth={1.6} color={color} />,
          }}
        />
        <Drawer.Screen
          name='FAQs'
          options={{
            title: t('drawer.faqs'),
            drawerIcon: ({ color }) => <MaterialIcons name="question-answer" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name='profile'
          options={{
            title: t('drawer.profile'),
            drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name='logout'
          options={{
            title: t('drawer.logout'),
            drawerIcon: ({ color }) => <FontAwesome name="sign-out" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name='settings'
          options={{
            title: t('drawer.settings'),
            drawerIcon: ({ color }) => <Icon name={'setting'} size={26} strokeWidth={1.6} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerLabelStyle: {
    fontSize: wp(2.5),
    fontWeight: theme.fonts.semibold,
  },
});
