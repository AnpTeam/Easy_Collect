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


const History = () => {
  const {data:posts,refetch} = useAppwrite(getAllPosts);

const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  console.log(posts)


  return (
    <SafeAreaView className="bg-primary border-2 h-full">
          <FlatList
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

                <Text className="mt-7 text-white text-semibold text-2xl mb-0">History</Text>
                
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

export default History