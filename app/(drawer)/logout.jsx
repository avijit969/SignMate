import { StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';


const Logout = ({ navigation }) => {
  const { t } = useTranslation()
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      Alert.alert('Success', 'You have been logged out.');

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('logout_page.are_you_sure_logout')}</Text>
      <Button buttonStyle={{
        backgroundColor: 'red',
        padding: 8,
      }} title={t('logout_page.logout')} onPress={handleLogout} />
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
