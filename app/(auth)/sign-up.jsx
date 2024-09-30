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
    <SafeAreaView className="bg-primary h-full mb-7">
        <ScrollView>
            {/* for make View Box */}
            <View className="justify-center h-full px-6 my-6">
                {/* Logo Image */}
                <View className="self-center">
                    <Image
                    source={images.logo}
                    resizeMode="contain"
                    className="w-[250px] h-[125px]"
                    />      
                </View>


                {/* Text */}
                <Text className="text-2xl text-black text-psemibold mt-5 mx-2">Sign Up to Easy Collect</Text>
                
                {/* TextBox Username */}
                <FormField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e) => setForm({...form,username:e})}
                    otherStyles="mt-3"
                    keyboardtype="text"
                    placeholder={'Enter the username'}
                />

                {/* TextBox Email */}
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
                    placeholder={'Enter the password'}
                />

                <FormField
                    title="telephone"
                    value={form.phone}
                    handleChangeText={(e) => setForm({...form,phone:e})}
                    otherStyles="mt-3"
                    keyboardtype="phone"
                    placeholder={'Enter the telephone Ex.0999999999'}
                />

                <FormField
                    title="Room Number"
                    value={form.room_number}
                    handleChangeText={(e) => setForm({...form,room_number:e})}
                    otherStyles="mt-3"
                    keyboardtype="RoomNumber"
                    placeholder={'Enter the room number Ex.201'}
                />

                {/* Sign up Button */}
                <CustomButton
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles="mt-3"
                    isLoading={isSubmitting}
                />
            </View>


        </ScrollView>

        {/* Text on Bottom */}
        <View className="flex justify-center flex-row gap-2 mt-2">
                <Text className="text-lg text-gray font-pregular">
                    Have an account already?
                </Text>

                {/* Link for Sign Up */}
                <Link
                    href="/sign-in"
                    className="text-lg font-psemibold text-secondary"
                >
                    Sign In
                </Link>
        </View>
    </SafeAreaView>
  )
};

export default SignUp