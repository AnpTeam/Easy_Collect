import { Text, ScrollView,  Alert ,Image, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'

import {Dropdown} from "react-native-element-dropdown";
import { useGlobalContext } from '../../context/GlobalProvider'
import { createBooking, getAccount, getCurrentUser } from "../../lib/appwrite";
import { images } from '../../constants'

const Booking = () => {
  const {user} = useGlobalContext();
  const [uploading , setUploading] = useState(false)
  const [form,setForm] = useState({
    title:'',
    time:'',
  })

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const data = [
    { label: '1 AM - 2 AM', value: '1' },
    { label: '2 AM - 3 AM', value: '2' },
    { label: '3 AM - 4 AM', value: '3' },
    { label: '4 AM - 5 AM', value: '4' },
    { label: '5 AM - 6 AM', value: '5' },
    { label: '6 AM - 7 AM', value: '6' },
    { label: '7 AM - 8 AM', value: '7' },
    { label: '8 AM - 9 AM', value: '8' },
    { label: '9 AM - 10 AM', value: '9' },
    { label: '10 AM - 11 AM', value: '10' },
    { label: '11 AM - 12 AM', value: '11' },
    { label: '12 PM - 13 PM', value: '12' },
    { label: '13 PM - 14 PM', value: '13' },
    { label: '14 PM - 15 PM', value: '14' },
    { label: '15 PM - 16 PM', value: '15' },
    { label: '16 PM - 17 PM', value: '16' },
    { label: '17 PM - 18 PM', value: '17' },
    { label: '18 PM - 19 PM', value: '18' },
    { label: '19 PM - 20 PM', value: '19' },
    { label: '20 PM - 21 PM', value: '20' },
    { label: '21 PM - 22 PM', value: '21' },
    { label: '22 PM - 23 PM', value: '22' },
    { label: '23 PM - 24 PM', value: '23' },
    { label: '24 PM - 1 AM', value: '24' },

  ];

  const submit = async () =>{
    if(!form.title || form.time){
      return Alert.alert('Please fill all  the field')
    }

    setUploading(true)

    try{
      await createBooking({
        ...form,
        accountId:(await getAccount()).$id,
        time:value,
        status : "PENDING"
      })

      Alert.alert('Successfully Booking')
      router.push('/home')
    }catch (error){
      Alert.alert('Error',error.message)
    }finally{
      setForm({
        title:'',
        time:'',
      })
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex mx-auto my-auto">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[250] h-[200] mb-0"
          />
        </View>

        <View>
          <Text className="text-2xl text-white font-black">
            Booking
          </Text>
        </View>

        <FormField
          title="Title"
          value={form.title}
          placeholder="Give a title"
          handleChangeText={(e) => setForm({...form,title:e})}
          otherStyles="mt-10"
        />

        <Text className="text-base text-white text bold mt-7">Time</Text>
        <Dropdown
          style={[isFocus && { borderColor: 'blue' }]}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Time' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderStyle={{ color: 'white' }}
          selectedTextStyle={{color:'white'}}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          className="mt-2 h-[50] border-2 rounded-lg px-8 border-yellow-400"
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

export default Booking