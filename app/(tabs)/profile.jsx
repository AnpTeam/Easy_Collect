import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker"; // นำเข้า Picker npm install @react-native-picker/picker
import Ionicons from 'react-native-vector-icons/Ionicons'

const Profile = () => {
  const [selectedNotification, setSelectedNotification] = useState(""); 
  

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // ข้อมูล (ถ้ามี)
        data={[]} // แทนที่ด้วยข้อมูลจริง
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="my-6 px-4">
              {/* ส่วนของชื่อบัญชี */}
              <View className="flex items-center">
              <Ionicons name="person-circle-outline" size={60} color="white" /> 
              <Text className="text-2xl font-semibold text-white mt-4 text-center">               
                Account Name
              </Text>
              </View>

              {/* ติดต่อทีมงาน & ประวัติการให้คะแนน */}
              <View className="flex flex-row justify-between border-t border-b border-gray-600 py-4 mt-6">
                <View className="flex items-center">
                <Ionicons name="person-outline" size={60} color="white" /> 
                <Text className="font-medium text-gray-100 text-sm">Contact Staff</Text>
                </View>

                <View className="flex items-center">
                <Ionicons name="star-half-outline" size={60} color="white" /> 
                <Text className="font-medium text-gray-100 text-sm">Rating History</Text>
                </View>
              </View>

              {/* ส่วนของการเลือกการแจ้งเตือน */}
              <View className="mt-6">
                <Text className="text-gray-100 text-sm">Select Notification</Text>
                <View className="border border-gray-600 rounded mt-2">
                  <Picker
                    selectedValue={selectedNotification} 
                    onValueChange={(itemValue) => setSelectedNotification(itemValue)}
                    style={{ color: 'white' }} 
                    dropdownIconColor="white" 
                  >
                    <Picker.Item label="Notification1" value="notification1" />
                    <Picker.Item label="Notification2" value="notification2" />
                    <Picker.Item label="Notification3" value="notification3" />
                  </Picker>
                </View>
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">เพื่อใส่ VDO</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
