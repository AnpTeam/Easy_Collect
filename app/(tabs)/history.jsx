import { View, Text, FlatList,Image, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from "react";


import { images } from '..//../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { getUserHistory } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomDateBox from '../../components/CustomDateBox';
import { useGlobalContext } from '../../context/GlobalProvider';


const History = () => {
  const {user} = useGlobalContext()
  const {data:posts,refetch} = useAppwrite(() => getUserHistory(user.$id));

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
              <CustomDateBox
                title={item.title}
                date={item.system_time}
                username={item.username}
              />
            )}

            ListHeaderComponent={() =>(
              <View className="flex my-6 px-4 space-y-3">
                <Text className="mt-7 text-white text-semibold text-2xl mb-0">History</Text>              
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState
              title="No Booking Found"
              subtitle="Be the first one to upload a video"
              />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          />
    </SafeAreaView>
  )
}

export default History