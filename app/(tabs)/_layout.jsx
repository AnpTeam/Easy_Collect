import { View, Text ,Image } from 'react-native'
import React from 'react'
import { Tabs ,Redirect } from 'expo-router'
import { icons } from '../../constants';

{/*Make an icon*/}
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};


{/*Make an TabBar*/}
const Tabslayout = () => {
  return (
    <>
     <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001", // สีส้มสำหรับไอคอนที่ active
          tabBarInactiveTintColor: "#787878", // สีเทาสำหรับไอคอนที่ inactive
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF", // สีพื้นหลังเข้ม
            borderTopWidth: 2,
            borderTopColor: "#E3E3E3",
            height: 94,
          },
        }}
      >

        {/*Make an menu*/}
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="booking"
          options={{
            title: "Booking",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Booking"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "history",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.history}
                color={color}
                name="history"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="Camera"
          options={{
            title: "Camera",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.camera}
                color={color}
                name="Camera"
                focused={focused}
              />
            ),
          }}
        />

        
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default Tabslayout