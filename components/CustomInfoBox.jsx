import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native'
import React from 'react'
import {images , icons } from '../constants'
import { router } from 'expo-router'

const CustomInfoBox = ({ username, title, time }) => {
    const qrcode = () => {
        router.push('/qrcode')
    }

  return (
    <View className="flex-col items-center px-4 mb-6">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center item-center p-0.5">
                    <Image source={images.profile}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'/>
                    
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1} >
                            {time} AM
                        </Text>
                    </View>
                </View>
                <View className="pt-1">
                    <TouchableOpacity 
                        onPress={qrcode}
                        activeOpacity={0.7} 
                    >
                        <Image source={icons.qrcode} className="w-5 h-5 bg-white p-3 border-white border-2" resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}

export default CustomInfoBox

const styles = StyleSheet.create({})