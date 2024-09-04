import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loading from '../components/Loading'
const index = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
     <Loading/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})