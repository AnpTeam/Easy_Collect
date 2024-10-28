import { StatusBar } from 'expo-status-bar';
import {ScrollView, Text, View , Image } from 'react-native';
import {Redirect,router} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";


import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />
  if (!loading && !isLogged) return <Redirect href="/sign-in"/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full justify-center items-center min-h-[85vh] px-4">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-[345px] h-[105px] my-[25px]"
        />       
      </View>

        <StatusBar style="auto"/>
    </SafeAreaView>
    
  );
}