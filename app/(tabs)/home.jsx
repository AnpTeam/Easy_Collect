import { View, Text, FlatList, Image, RefreshControl, Pressable, Linking, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '..//../constants';
import EmptyState from '../../components/EmptyState';
import { getUserBooking } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomInfoBox from '../../components/CustomInfoBox';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserBooking(user.$id));

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-gray-250 h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomInfoBox
            title={item.title}
            time={item.time}
            username={item.username}
            containerStyle={{
              backgroundColor: '#000000',
              padding: 20,
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.7,
              shadowRadius: 4,
              elevation: 6,
              marginVertical: 12, 
            }}
          />
        )}

        
        
        ListHeaderComponent={() => (
          <View className="my-4 px-4 space-y-4 mt-3">
          {/* Logo Section */}
          <View className="items-center mb-6">
            {/* Logo Image */}
            <View className="self-center">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[250px] h-[125px]"
                shadowOffset='4'
                shadowColor="#000000"
                shadowOpacity='0.25'
              />      
            </View>
          </View>

      
          {/* Heading Section */}
          <View className="w-7/12 flex-1 pb-3 border-b-2 border-gray/25">
            <Text className="text-black text-2xl font-pbold">
              Current Booking List
            </Text>     
          </View>
        </View>
        )}
       
        ListEmptyComponent={() => (
          <EmptyState
            title="No Booking Found"
            subtitle="Please make a booking to get Queue"
            containerStyle={{
              backgroundColor: '#3C3C3C',
              padding: 30,
              borderRadius: 15,
              marginTop: 60,
            }}
            titleStyle={{ color: '#FFD700', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}
            subtitleStyle={{ color: '#FFFAFA', fontSize: 18, textAlign: 'center' }}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
