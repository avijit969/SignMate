import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.image}
            source={{ uri: userData?.avatar || 'https://picsum.photos/seed/696/3000/2000' }}
            contentFit="cover"
            transition={1000}
          />
          <Pressable style={styles.editIcon}>
            <Icon name="edit" size={20} />
          </Pressable>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{t('profile_page.name')}: {userData?.name}</Text>
          <Text style={styles.name}>{t('profile_page.email')}: {userData?.user_metadata?.email}</Text>
        </View>
        <View style={styles.scoresContainer}>
          <View style={styles.scoreItem}>
            <Icon name="star" color={'#58d68d'} />
            <Text style={styles.scoresItems}>{t('profile_page.points')}</Text>
            <Text style={styles.itemsValue}>{userData?.points}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Icon name="fire" color={'#FF5733'} />
            <Text style={styles.scoresItems}>{t('profile_page.streaks')}</Text>
            <Text style={styles.itemsValue}>{userData?.streaks}</Text>
          </View>
          <View style={styles.scoreItem}>
            <Icon name="sign" color={'#3498db'} />
            <Text style={styles.scoresItems}>{t('profile_page.signs')}</Text>
            <Text style={styles.itemsValue}>{userData?.signs}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileContent: {
    gap: 15,
  },
  avatarContainer: {
    height: hp(20),
    width: wp(20),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: theme.radius.full,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userInfo: {
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: wp(3),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.dark,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 5,
    width: '100%',
    backgroundColor: '#f9e79f'
    , borderRadius: theme.radius.xl
  },
  scoreItem: {
    alignContent: 'center',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'center',
  },
  scoresItems: {
    fontSize: wp(3.5),
    color: '#34495e',
    fontWeight: theme.fonts.medium
  },
  itemsValue: {
    fontSize: wp(3),
    color: '#34495e',
    fontFamily: "sans-serif"
  }
});
