import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'
import { theme } from '../../constants/theme'
import Mail from './Email'
import Lock from './Lock'
import User from './User'
import Sign from './Sign'
import Learn from './Learn'
import Practice from './Practice'
import Setting from './Settings'
import Edit from './Edit'
import Fire from './Fire'
import Star from './Star'
const icons = {
  home: Home,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  email: Mail,
  lock: Lock,
  user: User,
  sign: Sign,
  learn: Learn,
  practice: Practice,
  setting: Setting,
  edit: Edit,
  fire: Fire,
  star: Star
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