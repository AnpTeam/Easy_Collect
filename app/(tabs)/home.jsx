import { View, Text, SectionList, Image, RefreshControl, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { images } from '..//../constants';
import EmptyState from '../../components/EmptyState';
import { getUserBooking, getUserHistory } from '../../lib/appwrite';
import useAppwrite from '../../lib/ueAppWrite';
import CustomInfoBox from '../../components/CustomInfoBox';
import CustomDateBox from '../../components/CustomDateBox';
import { useGlobalContext } from '../../context/GlobalProvider';

const HomeAndHistory = () => {
  const { user } = useGlobalContext();
  
  // State for bookings and history
  const { data: bookings, refetch: refetchBookings } = useAppwrite(() => getUserBooking(user.$id));
  const { data: history, refetch: refetchHistory } = useAppwrite(() => getUserHistory(user.$id));
  
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchBookings(), refetchHistory()]);  // Refetch both data
    setRefreshing(false);
  };

  // Create sections for the SectionList
  const sections = [
    {
      title: 'Current Booking List',
      data: bookings || [],  // Default to empty array if undefined
    },
    {
      title: 'Booking History',
      data: history || [],  // Default to empty array if undefined
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, section }) => {
          if (section.title === 'Current Booking List') {
            return (
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
            );
          } else {
            return (
              <CustomDateBox
                title={item.title}
                date={item.system_time}
                username={item.username}
              />
            );
          }
        }}
        ListHeaderComponent={() => (
          <View style={{ padding: 16, alignItems: 'center' }}>
            <Image
              source={images.logohome}
              resizeMode="contain"
              style={{ width: 300, height: 150 }} // ขนาดที่เพิ่มขึ้น
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Data Found"
            subtitle="Please make a booking"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000', padding: 16 }}>
            {title}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeAndHistory;
