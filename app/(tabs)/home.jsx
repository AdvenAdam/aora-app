import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, FlatList, Image, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import LatestPosts from '../../components/LatestPosts';
const Home = () => {

    const [refreshing, setRefreshing] = useState(false);
    const { data: posts, isLoading: loading, refetch } = useAppwrite(getAllPosts)
    const { data: latestPost } = useAppwrite(getLatestPosts)

    const onRefresh = async () => {
        setRefreshing(true);
        // call update
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary'>
            <FlatList
                // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                data={[]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text className='text-3xl text-white'>{item.id}</Text>}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='flex-row justify-between items-center mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100' >
                                    Welcome Back,
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    Ven Dam
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image
                                    source={images.logoSmall}
                                    className='w-9 h-10'
                                    resizeMode='contain'
                                />
                            </View>
                        </View>
                        <SearchInput />
                        <View className='w-full flex-1 pt-5 pb-8'>
                            <Text className='text-gray-100 text-lg font-pregular mb-3'>
                                Latest Video
                            </Text>
                            <Trending
                                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
                            />
                        </View>
                    </View>
                )
                }
                ListEmptyComponent={() =>
                    <EmptyState
                        title='No videos found'
                        subtitle='Try searching for something else'
                    />}
            />
            < Text > Home</Text >
        </SafeAreaView >
    );
};
export default Home;
