import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { wp } from '../../../helpers/common';
import { theme } from '../../../constants/theme';
import { ScrollView } from 'react-native';
import { Categories } from '../../../constants/leaningItems';
import { Image } from 'expo-image';

import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { t } from 'i18next';
/**
 * Leaning component
 *
 * This component renders a list of learning categories, with each category
 * represented as a pressable item that navigates to the corresponding
 * tutorial page when pressed.
 *
 * @returns {React.ReactElement} The Leaning component
 */
const Leaning = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <ScrollView>
        <Text style={styles.headerText}>{t('learning_page.header')}</Text>
        <View style={styles.container}>
          {Categories.leaningCategories.map((item, index) => (
            <Pressable onPress={() => router.push(`/tutorials/${item.name}`)} key={index}>
              <View key={index} style={styles.item} >
                <Image
                  style={styles.image}
                  source={item.imageUrl}
                  contentFit="cover"
                />
                <Text style={styles.itemText}>{t(`learning_page.${item.name.toLowerCase()}`)}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Leaning;

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: wp(3),
    fontWeight: theme.fonts.semibold,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  item: {
    width: wp(20),
    height: wp(20),
    backgroundColor: '#82e0aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: wp(12.5),
    overflow: 'hidden',
  },
  image: {
    width: wp(11),
    height: wp(11),
  },
  itemText: {
    fontSize: wp(3),
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
});
