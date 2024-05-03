import { useState } from 'react';
import { View, Text, Image, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { getAllBookmarks, getAllPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

const Bookmark = () => {

    const [refreshing, setRefreshing] = useState(false);
    const { user } = useGlobalContext();
    const { data: posts, isLoading: loading, refetch } = useAppwrite(() => getAllBookmarks(user))

    const onRefresh = async () => {
        setRefreshing(true);
        // call update
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                        creator={item.creator}
                        isLoading={loading}
                        isBookmarkPage={true}
                        bookmarks={item.bookmarks}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='flex-row justify-between items-center mb-6'>
                            <View>
                                <Text className='font-pbold text-3xl text-white' >
                                    Saved Videos
                                </Text>
                            </View>

                        </View>
                        <SearchInput placeholder={'Search your saved videos'} />

                    </View>
                )}
                ListEmptyComponent={() =>
                    <EmptyState
                        title='No videos found'
                        subtitle='Try searching for something else'
                    />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView >
    );
};
export default Bookmark;
