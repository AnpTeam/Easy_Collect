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

                <View className="mt-1.5 items-center">
                  <Image 
                    source={images.logo}
                    className="w-35 h-20"
                    resizeMode='contain'
                  />
                 </View>

                  
                <View className="w-full flex-1 pt-5 pb-4">
                <Text className="mt-7 text-white text-white text-2xl mb-0 font-black">All Booking List</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
              title="No Booking Found"
              subtitle="Please booking to get Queue"
              />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
    </SafeAreaView>
  )
}

export default Home