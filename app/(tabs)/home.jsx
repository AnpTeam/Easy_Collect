import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 
'react-native-safe-area-context'

import { Image, images } from '..//../constants'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
       data={[{ id: 1 },{ id: 2 },{ id: 3 },]}
       keyExtractor={(item) => item.$id} 
       renderItem={({item}) => (
        <Text className="text-3xl text-white">{item.id}</Text>
       )}
      />
    </SafeAreaView>
  )
}

export default Home