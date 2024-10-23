import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native'
import React from 'react'
import {images , icons } from '../constants'
import { router } from 'expo-router'

const CustomInfoBox = ({  title, time }) => {
    const qrcode = () => {
        router.push('/qrcode')
    }

  return (
    <View className="flex-col items-center px-4 mb-6">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1 ">
                <View className="w-[55px] h-[55px] rounded-lg border border-secondary justify-center item-center p-0.5">
                    <Image source={images.profile}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'/>
                    
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-black font-psemibold text-lg" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-md text-gray font-pregular" numberOfLines={1} >
                            {time} AM
                        </Text>
                    </View>
                </View>
                <View className="pt-1">
                    <TouchableOpacity 
                        onPress={qrcode}
                        activeOpacity={0.7} 
                    >
                        <Image source={icons.qrcode} className="w-[45px] h-[45px] bg-white p-3 border-white border-2" resizeMode='contain'/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}

export default CustomInfoBox

const styles = StyleSheet.create({})