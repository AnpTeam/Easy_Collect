import { View, Text, FlatList,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 
'react-native-safe-area-context'

import { images } from '..//../constants'
import SearchInput from '../../components/SearchInput'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
          <FlatList
            data={[{id: 1} ,{id: 2},{id: 3}]}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
              <Text className='text-3xl text-white'>{item.id}</Text>
            )}

            ListHeaderComponent={() =>(
              <View className="flex my-6 px-4 space-y-6">
                <View className="flex justify-between items-start flex-row mb-6">
                  <View>                  
                    <Text className='text-sm text-white font-medium'>Wecome Back</Text>
                    <Text className='text-2xl text-white font-semibold'>Easy Collect</Text>
                  </View>

                  <View className="mt-1.5">
                    <Image 
                      source={images.logo}
                      className="w-9 h-10"
                      resizeMode='contain'
                    />
                  </View>
                </View>

                <SearchInput/>

                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="">

                  </Text>
                </View>
              </View>
            )}
          />
    </SafeAreaView>
  )
}

export default Home