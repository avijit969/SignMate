import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseFontSize, increaseFontSize, resetFontSize } from '../../features/font/fontSlice';
import { toggleThemeMode } from '../../features/theme/themeSlice';
const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTheme, setSelectedTheme] = useState('Light');
  const [selectedFontSize, setSelectedFontSize] = useState(16);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const fontSize = useSelector((state) => state.fontSize.font_size);
  const themeMode = useSelector((state) => state.theme.mode)
  useEffect(() => {
    // Load the saved language, font size, and theme when the component mounts
    const loadSettings = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');

        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
          await i18n.changeLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, [i18n, dispatch]);

  const handleLanguageChange = async (value) => {
    setSelectedLanguage(value);
    try {
      await i18n.changeLanguage(value);
      await AsyncStorage.setItem('language', value); // Save selected language
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const handleThemeChange = (value) => {
    dispatch(toggleThemeMode(value))
  };


  const resetFont = () => {
    dispatch(resetFontSize());
    setSelectedFontSize(16);
  };

  return (
    <View style={[themeMode === 'light' ? styles.lightContainer : styles.darkContainer]}>
      <Text style={[styles.label, { fontSize: fontSize }]}>Select your language:</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={handleLanguageChange}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="हिंदी" value="hi" />
        <Picker.Item label='Odia' value="od" />
        <Picker.Item label="Gujurati" value="gu" />
      </Picker>

      <Text style={[styles.label, { fontSize: fontSize }]}>Select your theme:</Text>
      <Picker
        selectedValue={selectedTheme}
        onValueChange={handleThemeChange}
      >
        <Picker.Item label="Light" value="Light" />
        <Picker.Item label="Dark" value="Dark" />
      </Picker>

      <Text style={[styles.label, { fontSize: fontSize }]}>Adjust font size:</Text>
      <View style={styles.fontSizeContainer}>
        <TouchableOpacity onPress={() => { dispatch(decreaseFontSize()) }} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.fontSizeText, { fontSize: fontSize }]}>{fontSize}px</Text>
        <TouchableOpacity onPress={() => { dispatch(increaseFontSize()) }} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={resetFont} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Reset Font Size</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  darkContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: 'black',
    color: '#FFFFFF',
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',

  },
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  fontSizeText: {
    marginHorizontal: 20,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 4,
    marginVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

// Picker style
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping the icon
  },
});

export default Settings;
