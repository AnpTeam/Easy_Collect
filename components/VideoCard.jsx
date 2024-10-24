import {View,Text,  TouchableOpacity,Image} from 'react-native'
import { icons } from '../constants'
import React, { useState } from 'react'

const VideoCard = ({ title, creator, avatar, thumbnail }) => {
    const [play, setPlay] = useState(false);
    return(
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center item-center p-0.5">
                    <Image source={{uri:avatar}}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'/>
                    
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1} >
                            {creator}
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode='contain'/>
                </View>
            </View>
            {play?(
                <Text>Playing</Text>
            ) : (
                <TouchableOpacity>
                    <Image
                    source={{uri:thumbnail}}
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode="cover"
                    />
                </TouchableOpacity>
            )

            }
        </View>
    )
}

export default VideoCard