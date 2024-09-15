import { View, Text,ScrollView,Image,Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import {Link , router} from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { images } from '../../constants';

import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
const { setUser, setIsLogged } = useGlobalContext();
{/* for make State of variable */}
const [isSubmitting, setSubmitting] = useState(false);
{/* for make form of variable */}
const [form,setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone:"",
    room_number:""
})

{/* for make link to submit */}
const submit = async () => {
    if (form.email === "" || form.password === "" ||form.username === "" ||form.phone === "" ||form.room_number === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
  
      setSubmitting(true);
      try {
        const result = await createUser(form.email, form.password, form.username ,form.phone,form.room_number);
        setUser(result);
        setIsLogged(true);
  
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
}

return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
            {/* for make View Box */}
            <View className="justify-center h-full px-6 my-6 round-2xl">

                {/* Logo Image */}
                <Image
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[115px] h-[75px] mt-0"
                />

                {/* Text */}
                <Text className="text-2xl text-white text-semibold mt-5 font-black">Sign Up to Easy Collect</Text>
                
                {/* TextBox Username */}
                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e) => setForm({...form,username:e})}
                    otherStyles="mt-7"
                    keyboardtype="text"
                    placeholder={'username'}
                />

                {/* TextBox Email */}
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({...form,email:e})}
                    otherStyles="mt-7"
                    keyboardtype="email-address"
                    placeholder={'email'}
                />

                {/* TextBox Password */}
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e) => setForm({...form,password:e})}
                    otherStyles="mt-7"
                    placeholder={'password'}
                />

                <FormField
                    title="phone"
                    value={form.phone}
                    handleChangeText={(e) => setForm({...form,phone:e})}
                    otherStyles="mt-7"
                    keyboardtype="phone"
                    placeholder={'XxxXxxXxxx'}
                />

                <FormField
                    title="Room Number"
                    value={form.room_number}
                    handleChangeText={(e) => setForm({...form,room_number:e})}
                    otherStyles="mt-7"
                    keyboardtype="RoomNumber"
                    placeholder={'XXX'}
                />

                {/* Sign up Button */}
                <CustomButton
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />
            </View>

            {/* Text on Bottom */}
            <View className="flex justify-center flex-row gap-2">
                <Text className="text-lg text-gray-100 font-pregular">
                    Have an account already?
                </Text>

                {/* Link for Sign Up */}
                <Link
                    href="/sign-in"
                    className="text-lg font-psemibold text-yellow-400"
                >
                    Sign In
                </Link>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
};

export default SignUp