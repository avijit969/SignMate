import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Icon from '@/assets/icons';
import { theme } from '../../constants/theme';
import { wp } from '../../helpers/common';

export default function Layout() {
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
            title: "Home",
            drawerIcon: ({ color}) => <Icon name={'home'} size={26} strokeWidth={1.6} color={color} />, 
          }}
        />
        <Drawer.Screen
          name='FAQs'
          options={{
            title: "FAQs",
            drawerIcon: ({ color }) => <MaterialIcons name="question-answer" size={24} color={color} />, 
          }}
        />
        <Drawer.Screen
          name='profile'
          options={{
            title: "Profile",
            drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />, 
          }}
        />
        <Drawer.Screen
          name='logout'
          options={{
            title: "Logout",
            drawerIcon: ({ color }) => <FontAwesome name="sign-out" size={24} color={color} />, 
          }}
        />
        <Drawer.Screen
          name='settings'
          options={{
            title: "settings",
            drawerIcon: ({ color }) =>  <Icon name={'setting'} size={26} strokeWidth={1.6} color={color} />, 
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
