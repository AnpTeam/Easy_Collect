import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg' //npx expo install react-native-qrcode-svg
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const qrcode = () => {
    const back = () =>{
        router.push('/home')
    }

    const changeStatus = async () => {
        await changeStatus()

    }

  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="px-4 my-6">
            <Text className="text-3xl text-white text-bold">Your QR Code</Text>
            <Text className="text-2xl text-white">Please always show to staff</Text>

            <View className="mx-auto mt-3 p-3">
                <QRCode
                    value= {'/acceptChange'}
                    size={300}
                />
            </View>


            <CustomButton
                title="Return to Home"
                handlePress={back}  
                containerStyles="mt-7"
            />
        </View>
    </SafeAreaView>
  )
}

export default qrcode