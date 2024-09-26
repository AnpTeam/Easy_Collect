import { View, Text, FlatList, Image, RefreshControl, Pressable, Linking } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '..//../constants';
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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <CustomInfoBox
            title={item.title}
            time={item.time}
            username={item.username}
            containerStyle={{
              backgroundColor: '#1E1E2D',
              padding: 20,
              borderRadius: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.7,
              shadowRadius: 4,
              elevation: 6,
              marginVertical: 12,
            }}
            titleStyle={{ color: '#FFD700', fontSize: 22, fontWeight: 'bold' }}
            subtitleStyle={{ color: '#F0E68C', fontSize: 18 }}
          />
        )}
        
        ListHeaderComponent={() => (
          <View className="my-4 px-4 space-y-4">
            {/* Logo Section */}
            <View className="items-center mt-2">
              <Image
                source={images.logo}
                style={{ width: 150, height: 80 }}
                resizeMode='contain'
              />
            </View>
        
            {/* Heading Section */}
            <View className="w-full flex-1 pt-2 pb-3">
              <Text className="text-white text-5xl font-extrabold text-center mb-3">
                Booking List
              </Text>
              {/* เส้นข้างล่างของ Booking List */}
              <View style={{ borderBottomWidth: 3, borderBottomColor: 'white', paddingVertical: 10 }}>
                <View className="flex flex-row justify-between">
                  <View className="flex items-center mx-10">
                    <Pressable onPress={() => Linking.openURL(`tel:${'0972407510'}`)}>
                      <Image
                        source={images.staff}
                        resizeMode="contain"
                        className="w-[50px] h-[50px]"
                      />
                    </Pressable>
                    <Text className="font-medium text-gray-100 text-lg mt-1">
                      Booking
                    </Text>
                  </View>
        
                  <View className="flex items-center mx-10">
                    <Pressable onPress={() => router.push('/rating')}>
                      <Image
                        source={images.star}
                        resizeMode="contain"
                        className="w-[50px] h-[50px]"
                      />
                    </Pressable>
                    <Text className="font-medium text-gray-100 text-lg mt-1">
                      History
                    </Text>
                  </View>
                </View>
              </View>  
              
              {/* Statistics Section */}
              <View className="bg-yellow-600 rounded-md p-4 my-4 shadow-md">
  <Text className="text-white text-2xl font-bold text-center mb-2">Your Statistics</Text>
  
  <View className="flex flex-col items-center">
    <Text className="text-black-400 text-md">
      Total Bookings: <Text className="font-semibold text-black">{posts.length}</Text>
    </Text>
    
    <Text className="text-gray-700 text-sm mt-2 text-center italic">
      (Check your history for confirmed bookings.)
    </Text>
  </View>
</View>



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
