
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

import { useGlobalContext } from '../context/GlobalProvider'
import { createBooking, getAccount } from "../lib/appwrite";
import { images } from '../constants'

import { Rating } from 'react-native-ratings'; 

const rating = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    time: '',
  })

  const [rating, setRating] = useState(0); 

  const submit = async () => {
    if (!form.title || !rating) {
      return Alert.alert('Please fill all the fields')
    }

    setUploading(true)

    try {
      await createBooking({
        ...form,
        accountId: (await getAccount()).$id,
        time: rating, 
        status: "PENDING"
      })

      Alert.alert('Successfully Booking')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        time: '',
      })
      setRating(0); 
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex mx-auto my-auto">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[250] h-[200] mb-0"
          />
        </View>

        <View>
          <Text className="text-2xl text-black font-black">
          Rate your experience:
          </Text>
        </View>

      
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          showRating
          onFinishRating={(rating) => setRating(rating)} 
          style={{ paddingVertical: 10 }}
        />

        <CustomButton
          title="submit"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default rating;
