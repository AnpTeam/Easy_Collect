import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native'
import React from 'react'
import {images , icons } from '../constants'
import { router } from 'expo-router'

const CustomAllUserbox = ({ username, roomnumber , avatars }) => {

  return (
    <View className="flex-col items-center px-4 mb-6">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1 ">
                <View className="w-[55px] h-[55px] rounded-lg border border-secondary justify-center item-center p-0.5">
                    <Image source={{uri:avatars}}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'/>
                    
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-black font-psemibold text-lg" numberOfLines={1}>
                            {username}
                        </Text>
                        <Text className="text-md text-gray font-pregular" numberOfLines={1} >
                           Room : {roomnumber} 
                        </Text>
                    </View>
                </View>
            </View>
        </View>
  )
}

export default CustomAllUserbox

const styles = StyleSheet.create({})