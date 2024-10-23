
import React from 'react'
import QRCode from 'react-native-qrcode-svg' //npx expo install react-native-qrcode-svg
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'

const qrcode = () => {
    const {user} = useGlobalContext()

    const back = () =>{
        router.push('/home')
    }



  return (
    <SafeAreaView className="bg-primary h-full">
        <View className="px-4 my-6">
            <Text className="text-4xl text-black text-bold text-center">My QR Code</Text>

            <View className="mx-auto mt-3 p-3">
                    <QRCode
                    value= {user.$id}
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