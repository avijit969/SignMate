import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

export default function Loading({size='large',color=theme.colors.primary}) {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size={size} color={color}/>
  </View>
  )
}

const styles = StyleSheet.create({})