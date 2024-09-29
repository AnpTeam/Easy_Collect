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
            <View className="h-full px-4 my-28 w-full self-center">
                {/* Logo Image */}
                <View className="items-center">
                  <Image
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[250px] h-[125px]"
                  />
                </View>

                {/* Text */}
                <Text className="text-3xl text-black font-pregular mt-2">Log in to Easy Collect</Text>
                
                {/* TextBox Username */}
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({...form,email:e})}
                    otherStyles="mt-3"
                    keyboardtype="email-address"
                    placeholder={'Enter the email'}
                />
                
                {/* TextBox Password */}
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e) => setForm({...form,password:e})}
                    otherStyles="mt-3"
                    placeholder={' Enter the password'}
                />

                {/* Forgot password */}
                <Link href="/home" className='mt-2 mx-3 self-end'><Text className="text-sm font-pregular">Forgot password?</Text></Link>

                {/* Sign in Button */}
                <CustomButton
                    title="Log in"
                    handlePress={submit}
                    containerStyles="mt-7 w-full"
                    isLoading={isSubmitting}
                />

                {/* Texton Bottom */}
                <View className="flex justify-center pt-5 flex-row gap-2">
                  <Text className="text-lg text-gray font-pregular">
                    Don't have an account?
                  </Text>

                {/* Link for Sign Up */}
                <Link
                    href="/sign-up"
                    className="text-lg font-psemibold text-secondary"
                >
                  Signup
                </Link>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
};

export default SignIn