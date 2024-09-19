import { StyleSheet, Text, View ,FlatList ,Image, Alert, Pressable ,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import {icons} from '../../constants'
import {images} from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import InfoBox from '../../components/InfoBox';

const profile = () => {
  const {user,setUser,setIsLogged} =  
  useGlobalContext();

const logout = async () =>{
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
            <View className="my-6 px-4">
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
                  <Image
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[345px] h-[105px]"
                  />
                  <Text className="font-medium text-gray-100 text-sm">
                    <InfoBox
                      title={user?.username}
                      containerStyles='mt-1'  
                      titleStyles="text-lg-gray"
                    />
                  </Text>

              </View>

              {/* ติดต่อทีมงาน & ประวัติการให้คะแนน */}
              <View className="flex flex-row justify-between border-t border-b border-gray-600 py-4 mt-6">
                <  View className="flex items-center mx-10 p-3">
                  <Pressable onPress={() => Alert.alert('0972407510')}>
                  <Image
                    source={images.staff}
                    resizeMode="contain"
                    className="w-[50px] h-[50px]"
                  />
                  </Pressable>
                  <Text className="font-medium text-gray-100 text-sm">Contact Staff</Text>
                </View>

                <View className="flex items-center mx-10 p-3">
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    className="w-[50px] h-[50px]"
                  /> 
                  <Text className="font-medium text-gray-100 text-sm">Rating History</Text>
                </View>
              </View>


              
              <View>
              <Text className="font-medium text-gray-100 text-sm">
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    className="w-[15px] h-[15px]"
                  /> 
                E-mail</Text> 
                <Text className="font-medium text-gray-100 text-sm">
                    <InfoBox
                      title={user?.email}
                      containerStyles='mt-5'
                      titleStyles="text-lg-gray"
                    />                    
                  </Text>    

                  <Text className="font-medium text-gray-100 text-sm">
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    className="w-[15px] h-[15px]"
                  /> 
                Room ID</Text> 
                <Text className="font-medium text-gray-100 text-sm">
                    <InfoBox
                      title={user?.room_number}
                      containerStyles='mt-5'
                      titleStyles="text-lg-gray"
                    />                    
                  </Text>   
                  <Text className="font-medium text-gray-100 text-sm">
                  <Image
                    source={images.star}
                    resizeMode="contain"
                    className="w-[15px] h-[15px]"
                  /> 
                Tel</Text> 
                <Text className="font-medium text-gray-100 text-sm">
                    <InfoBox
                      title={user?.phone}
                      containerStyles='mt-5'
                      titleStyles="text-lg-gray"
                    />                    
                  </Text>  
              </View>
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}



export default profile