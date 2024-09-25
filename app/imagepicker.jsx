import {Alert ,Image, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'
import {FormField} from '../components/FormField'

import { updateProfile, } from "../lib/appwrite";



const imagepicker = () => {
  const submit = async () =>{
    await updateProfile('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0o3edEgdzS5dAC8UiB2vqvNYLPtZ9w4U_g&s')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <CustomButton
          title="submit"
          handlePress={submit}
          containerStyles="mt-7"
        />    
    </SafeAreaView>
  )
}

export default imagepicker