import { StatusBar } from 'expo-status-bar';
import {ScrollView, Text, View , Image } from 'react-native';
import {Redirect,router} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";


import { images } from "../constants";
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}> 
      <View className="w-full justify-center items-center min-h-[85vh] px-4">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[345px] h-[105px] my-[25px]"
       />
      <Image
        source={images.cards}
        resizeMode="contain"
        className="w-[700px] h-[350px]"
       />       

        <View className="relative mt-5">
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Discover Endless Posibilities with 
            <Text className=""> EasyCollect</Text>
          </Text>

        <Image
          source={images.path}
          className="w-[136px] h-[12px] absolute -bottom-2 absolute 
          -bottom- -right-8"
          resizeMode="contain"
          />
          
        </View>
        
        <Text className="text-sm font-pregulat text-gray-100 mt-7 text-center">
        <StatusBar style="auto"/>
        Quick pickups, endless convenience—collect your packages with ease at EasyCollect.
        </Text>

        <CustomButton
          title="Go to Home"
          handlePress={() => router.push('/home')}
          containerStyles="w-full mt-7"/>
      </View>
      </ScrollView>
    </SafeAreaView>
    /*<View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">EasyCollect</Text>
      <StatusBar style="auto"/>
      <Link href="/home" style={{color:'blue'}}>Go to Home</Link>
      <Link href="/sign-in" style={{color:'blue'}}>Go to Sign in</Link>
    </View>*/
  );
}