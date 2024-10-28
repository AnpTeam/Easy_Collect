import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import { getAllUser, getUserHistory, sendEmail } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomDateBox from '../../components/CustomDateBox';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomAllUserbox from '../../components/CustomAllUserbox';

const Notification = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllUser);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(posts);

  const handleEmail = (emails) => {
    return sendEmail(emails);
  };

  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEmail(item.email)}>
            <CustomAllUserbox username={item.username} roomnumber={item.room_number} avatars={item.avatar}/>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={{ width: 300, height: 150 }} // Adjusted size
            />
        <View className="flex flex-row items-center py-3 px-2 ">
  <Text className="text-black font-bold text-2xl flex-1">
    All Users
  </Text>
  {/* คุณอาจต้องการเพิ่มไอคอนหรือปุ่มอื่นๆ ที่นี่ */}
</View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Booking Found"
            subtitle="Wait for user booking"
            titleStyle={{ fontSize: 20, fontWeight: '600' }} // Font style for title
            subtitleStyle={{ fontSize: 16, fontWeight: '400', color: 'gray' }} // Font style for subtitle
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Notification;
