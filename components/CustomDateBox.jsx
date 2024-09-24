import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native'
import React from 'react'
import {images , icons } from '../constants'

const CustomDateBox = ({ username, title, date }) => {

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
                            {date.substring(0, 10)}
                        </Text>
                    </View>
            </View>

            <View className="pt-1">
                <Text className="text-2xl text-green-500 font-black">CONFIRMED</Text>
            </View>
        </View>
    </View>
  )
}

export default CustomDateBox
