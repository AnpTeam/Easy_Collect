import {Alert ,Image, View ,Text , TextInput} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'

import { router } from 'expo-router'
import { updateProfile, } from "../lib/appwrite";



const imagepicker = () => {
  const [url,setUrl] = useState('')

  const submit = async () =>{
    await updateProfile(url)
    setUrl('')
    router.push('/profile')
  }


  return (
    <SafeAreaView className="bg-primary h-full font-psemibold">
      <Text className="text-2xl">Please Insert the url</Text>

      <TextInput
        className=" text-base border-yellow-400"
        value={url}
        placeholder={"Please insert url..."}
        placeholderTextColor='#00000'
        onChangeText={setUrl}   
        />

      <CustomButton
          title="submit"
          handlePress={submit}
          containerStyles="mt-7"
        />    
    </SafeAreaView>
  )
}

export default imagepicker