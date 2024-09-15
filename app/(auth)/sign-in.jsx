import { View, Text,ScrollView,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import {Link} from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';
import { router } from 'expo-router';

import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };


return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            {/* for make View Box */}
            <View className="justify-center h-full px-4 my-6 round-2xl">

                {/* Logo Image */}
                <Image
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[345px] h-[105px]"
                />

                {/* Text */}
                <Text className="text-2xl text-white text-semibold mt-10 font-black">Log in to Easy Collect</Text>
                
                {/* TextBox Username */}
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({...form,email:e})}
                    otherStyles="mt-7"
                    keyboardtype="email-address"
                    placeholder={'email or username'}
                />
                
                {/* TextBox Password */}
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e) => setForm({...form,password:e})}
                    otherStyles="mt-7"
                    placeholder={'password'}
                />

                {/* Forgot password */}
                <Link href="/home" style={{color:'white'}} className=' mt-3'><Text className="text-md1">Forgot password?</Text></Link>

                {/* Sign in Button */}
                <CustomButton
                    title="Sign In"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />
            </View>

            {/* Texton Bottom */}
            <View className="flex justify-center pt-5 flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">
                    Don't have an account?
                </Text>

                {/* Link for Sign Up */}
                <Link
                    href="/sign-up"
                    className="text-lg font-psemibold text-yellow-400"
                >
                    Signup
                </Link>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
};

export default SignIn