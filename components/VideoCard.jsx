import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { icons } from '../constants'
import { useEffect, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import useAppwrite from '../lib/useAppwrite'
import { useGlobalContext } from '../context/GlobalProvider'
import { cekBoorkmark, updateBookmark } from '../lib/appwrite'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const VideoCard = ({ video: { title, thumbnail, video, prompt, $id }, creator: { username, avatar }, bookmarks, isLoading, isBookmarkPage = false }) => {
    const [play, setPlay] = useState(false)
    const { user } = useGlobalContext();
    const { data: isBookmark } = useAppwrite(() => cekBoorkmark(bookmarks, user?.$id))


    const [bookmarked, setBookmarked] = useState(false);
    useEffect(() => {
        if (typeof isBookmark !== 'undefined') {
            setBookmarked(isBookmark);
        }
    }, [isBookmark]);
    const toggleBookmark = async () => {
        const updatedBookmarks = bookmarked
            ? bookmarks.filter(bookmark => bookmark.$id !== user?.$id)
            : [...bookmarks, user];

        try {
            await updateBookmark(updatedBookmarks, $id);
            setBookmarked(!bookmarked);
            router.replace('/home');
            Alert.alert('Success', bookmarked ? 'Video has been removed from your bookmarks' : 'Video has been added to your bookmarks');
        } catch {
            Alert.alert('Error');
        }
    }



    if (isLoading) return <Text className='text- white text-3xl'>Loading ...</Text>
    if (!bookmarked && isBookmarkPage) return null
    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1 '>
                    <View className=' w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='flex-1 justify-center ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <TouchableOpacity
                        onPress={() => toggleBookmark()}
                    >
                        {
                            bookmarked ? (
                                <MaterialCommunityIcons name="bookmark" color={'white'} size={30} />
                            ) : (
                                <MaterialCommunityIcons name="bookmark-outline" color={'white'} size={30} />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
            {
                play ?
                    (<Video
                        source={{ uri: video }}
                        className='w-full h-60 rounded-xl mt-2'
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setPlay(false);
                            }
                        }}
                    />) :
                    (<TouchableOpacity
                        activeOpacity={0.7}
                        className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                        onPress={() => setPlay(true)}
                    >
                        <Image
                            source={{ uri: thumbnail }}
                            className='w-full h-full rounded-lg mt-3'
                            resizeMode='cover'
                            onPress={() => setPlay(true)}
                        />
                        <Image
                            source={icons.play}
                            className='w-12 h-12 absolute'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>)
            }
        </View>
    )
}
export default VideoCard