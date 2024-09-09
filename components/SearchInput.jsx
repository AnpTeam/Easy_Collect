import { View, Text ,TextInput} from 'react-native'
import React, { useState } from 'react'

const SearchInput = ({title, value ,placeholder ,handleChangeText,otherStyles,...prop}) => {
    const [showPassword,setShowPassword] =useState(false) 
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-white text bold">{title}</Text>
      <View className="border-2 border-red-50 h-16 px-4 bg-black-100 item-center rounded-2xl">
        <TextInput
        className="flex-1 text-white text-base"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor='#FFFF'
        onChangeText={handleChangeText}
        secureTextEntry ={title === 'Password' && !showPassword}
        
        />

      </View>
    </View>
  )
}

export default SearchInput