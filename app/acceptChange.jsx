import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { getUpdate } from '../lib/appwrite'
import { useState } from 'react'

const acceptChange = () => {
    const [uploading , setUploading] = useState(false)

    const getUpdateDatabase = async() =>{
        try {
           await getUpdate()
          } catch (error) {
            console.error('Error updating document:', error);
          }
    }

    return (
        <SafeAreaView className="h-full bg-primary">
            <View className="justify-center">
                <Text className="text-white text-3xl font-black">Parcel Confirmation</Text>
                <Text className="text-white text-2xl">Please check before confirm ,then click accept button</Text>
                <CustomButton 
                    title={'Confirm'}
                    handlePress={getUpdateDatabase}  
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </View>
        </SafeAreaView>
      )
  };

export default acceptChange

const styles = StyleSheet.create({})