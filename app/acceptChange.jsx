import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { changeStatus } from '../lib/appwrite'
import { useState } from 'react'
import { getAllPosts } from '../lib/appwrite'

const acceptChange = () => {
    const {data:posts,refetch} = useAppwrite(getAllPosts);

    const [uploading , setUploading] = useState(false)

    const confirm = async () =>{
        try{
            await changeStatus()
            setUploading(true)
        }catch (error) {
            throw new Error(error);
        }

    }

  return (
    <SafeAreaView className="h-full bg-primary">
        <View>
            <Text className="text-white text-3xl">Parcel Confirmation</Text>
            <Text className="text-white text-3xl">Please check before confirm ,then click accept button</Text>
            <CustomButton 
                title={'Confirm'}
                handlePress={confirm}  
                containerStyles="mt-7"
                isLoading={uploading}
            />
        </View>
    </SafeAreaView>

    
  )
  
}

export default acceptChange

const styles = StyleSheet.create({})