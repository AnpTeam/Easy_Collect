import { StyleSheet, Text, View, FlatList, Image, Alert, Pressable, TouchableOpacity , Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from '../../constants'
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut , uploadImage} from '../../lib/appwrite';
import { router } from 'expo-router';
import InfoBox from '../../components/InfoBox';

const profile = () => {
  const { user, setUser, setIsLogged } =
    useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLogged(false)

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // ข้อมูล (ถ้ามี)
        data={[]} // แทนที่ด้วยข้อมูลจริง
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-3 px-4">
              <TouchableOpacity
                className='w-fill items-end mb-10'
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode='contain'
                  className='w-6 h-6'
                />
              </TouchableOpacity>


              {/* ส่วนของชื่อบัญชี */}
              <View className="flex items-center">
              <Pressable onPress={() => router.push('/imagepicker')}> 
                <Image
                  source={{uri:user?.avatar}}
                  resizeMode="contain"
                  className="w-[234px] h-[75px] mb-3"
                />
              </Pressable>
                
                <Text className="font-medium text-gray-100 mt-2">
                  <InfoBox
                    title={"Welcome Back, " + user?.username}
                    containerStyles='mt-4'
                    titleStyles="text-2xl font-semibold"
                  />
                </Text>

              </View>

              {/* ติดต่อทีมงาน & ประวัติการให้คะแนน */}
              <View className="flex flex-row justify-between border-t border-b border-gray-600 py-4">
                <  View className="flex items-center mx-10 p-3">
                  <Pressable onPress={() => Linking.openURL(`tel:${'0972407510'}`)}>
                    <Image
                      source={images.staff}
                      resizeMode="contain"
                      className="w-[50px] h-[50px]"
                    />
                  </Pressable>
                  <Text className="font-medium text-gray-100 text-sm">Contact Staff</Text>
                </View>

                <View className="flex items-center mx-10 p-3">
                <Pressable onPress={() => router.push('/rating')}>
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    className="w-[50px] h-[50px]"
                  />
                </Pressable>

                  
                  <Text className="font-medium text-gray-100 text-sm">Rating History</Text>
                </View>
              </View>

              <View className="mt-4">
                <View className="mb-4">
                  <Text className="flex items-center text-white mb-2 font-semibold">
                    <Image
                      source={icons.email}
                      resizeMode="contain"
                      className="w-5 h-5 mr-2"
                    />
                    E-mail
                  </Text>

                  <View className="bg-gray-800 p-3 rounded-lg">
                    <InfoBox
                      title={user?.email}
                      containerStyles="mt-1"
                      titleStyles="text-white text-left font-medium mt-1"
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="flex items-center text-white mb-2 font-semibold">
                    <Image
                      source={icons.roomid}
                      resizeMode="contain"
                      className="w-5 h-5 mr-2"
                    />
                    Room Number
                  </Text>

                  <View className="bg-gray-800 p-3 rounded-lg">
                    <InfoBox
                      title={user?.room_number}
                      containerStyles="mt-1"
                      titleStyles="text-white text-left font-medium mt-1"
                    />
                  </View>
                </View>
                <View className="mb-4">
                  <Text className="flex items-center text-white mb-2 font-semibold">
                    <Image
                      source={icons.telephone}
                      resizeMode="contain"
                      className="w-5 h-5 mr-2"
                    />
                    Telephone
                  </Text>

                  <View className="bg-gray-800 p-3 rounded-lg">
                    <InfoBox    
                      title={user?.phone}
                      containerStyles="mt-1"
                      titleStyles="text-white text-left font-medium mt-1"
                    />
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}



export default profile