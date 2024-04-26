import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'


const zoomIn = {
    0: {
        scale: 0.8
    },
    1: {
        scale: 1,
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.8,
    }
}
const LatestItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className='w-52 h-72 rounded-[20px]'
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => {
                        setPlay(true)
                        console.log(item.video)
                    }}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[20px]  my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}
const LatestPosts = ({ posts }) => {
    const [active, setActive] = useState(posts[0])
    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActive(viewableItems[0].key)
        }
    }
    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => (
                <LatestItem
                    activeItem={active}
                    item={item}
                />
            )}
            keyExtractor={(item) => item.$id}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 70
            }}
            contentOffset={{ x: 10, y: 0 }}
            horizontal
        />
    )
}
export default LatestPosts