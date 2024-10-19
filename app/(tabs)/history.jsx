import { View, Text, FlatList,Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from "react";


import { images } from '..//../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard';
import { getAllUser, getUserHistory , sendEmail } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomDateBox from '../../components/CustomDateBox';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomAllUserbox from '../../components/CustomAllUserbox';


const History = () => {
  const {user} = useGlobalContext()
  const {data:posts,refetch} = useAppwrite(getAllUser);

const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  console.log(posts)

  const handleEmail = (emails) => {
    return sendEmail(emails)
  }


  return (
    <SafeAreaView className="bg-primary border-2 h-full">
          <FlatList
             data={posts}         
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
              <TouchableOpacity 
                onPress={() => handleEmail(item.email)}
              >
           <CustomAllUserbox
                username={item.username}
                roomnumber={item.room_number}
              />
              </TouchableOpacity>
            )}

            ListHeaderComponent={() =>(
              <View className="flex my-6 px-4 space-y-3 border-b-2 border-gray/25 w-4/12 mx-3">
                <Text className="mt-7 text-black text-psemibold text-2xl mb-0">All User</Text>              
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