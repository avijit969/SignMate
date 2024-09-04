import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { supabase } from '../lib/supabase';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.replace('Login'); // Redirect to the login screen after logout
    }
  };

  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
