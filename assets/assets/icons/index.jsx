import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'
import { theme } from '../../constants/theme'
import Mail from './Email'
import Lock from './Lock'
import User from './User'

const icons = {
  home: Home,
  arrowLeft:ArrowLeft,
  arrowRight:ArrowRight,
  email:Mail,
  lock:Lock,
  user:User
}

export default function Icon({ name, ...props }) {
  const IconComponent = icons[name]
  return (
    <IconComponent
      height={props.height || 24}
      width={props.width || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  )
}

const styles = StyleSheet.create({})