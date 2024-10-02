import { View, Text ,TextInput ,TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value ,placeholder ,handleChangeText,otherStyles,...prop}) => {
    const [showPassword,setShowPassword] =useState(false) 
  
    return (
    <View className={`space-y-1 ${otherStyles}`}>
      <Text className="text-lg font-psemibold">{title}</Text>
      <View className="mt-1 w-full h-14 bg-primary rounded-[20px] border-2 border-black focus:border-secondary flex flex-row items-center">
        <TextInput
        className="flex-1 text-black text-base font-pregular px-2"
        value={value}
        placeholder={placeholder}
        placeholderTextColor='text-grey'
        onChangeText={handleChangeText}
        secureTextEntry ={title === 'Password' && !showPassword}     
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 p-1 mx-2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField