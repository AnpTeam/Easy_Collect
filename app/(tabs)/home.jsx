import { View, Text, FlatList,Image, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from "react";


import { images } from '..//../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {getUserBooking } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomInfoBox from '../../components/CustomInfoBox';
import { useGlobalContext } from '../../context/GlobalProvider';


const Home = () => {
  const {user} = useGlobalContext()
  const {data:posts,refetch} = useAppwrite(() => getUserBooking(user.$id));

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  //  const dataMock = [
  //    {
  //      id: 1,
  //      title: 'test1',
  //      video: 'https://www.youtube.com/watch?v=vNlHMb12yNg',
  //      creator: {
  //        username: 'username1',
  //       avatar: null
  //     }
  //   }
  // ]


  console.log(posts)


  return (
    <SafeAreaView className="bg-primary border-2 h-full">
          <FlatList
             //data={dataMock}  
             data={posts}         
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
              <CustomInfoBox
                title={item.title}
                time={item.time}
                username={item.username}
              />
            )}

            ListHeaderComponent={() =>(
              <View className="flex my-4 px-2 space-y-3">
                <View className="flex justify-between items-start flex-row mb-1">
                  <View className="mb-3">                  
                    <Text className='text-sm text-white font-medium'>Welcome Back</Text>
                    <Text className='text-2xl text-white font-semibold'>Easy Collect</Text>
                  </View>

                  <View className="mt-1.5">
                    <Image 
                      source={images.logo}
                      className="w-9 h-10"
                      resizeMode='contain'
                    />
                  </View>
                </View>

                <SearchInput/>

                  
                <View className="w-full flex-1 pt-5 pb-4">
                <Text className="mt-7 text-white text-white text-2xl mb-0">All Booking List</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
              title="No Videos Found"
              subtitle="Be the first one to upload a video"
              />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
    </SafeAreaView>
  )
}

export default Home