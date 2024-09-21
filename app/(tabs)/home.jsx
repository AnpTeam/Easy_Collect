import { View, Text, FlatList,Image, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from "react";


import { images } from '..//../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { getAllPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomInfoBox from '../../components/CustomInfoBox';


const Home = () => {
  const {data:posts,refetch} = useAppwrite(getAllPosts);

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
              <View className="flex my-6 px-4 space-y-3">
                <View className="flex justify-between items-start flex-row mb-1">
                  <View>                  
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

                  
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg-font-pregular mb-2">
                  Lastest Video
                  </Text>

                <Trending posts={[{id: 1} ,{id: 2},{id:3}] ?? [] }/>

                <Text className="mt-7 text-white text-semibold text-2xl mb-0">All Booking List</Text>
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