import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import VideoCard from '../../../components/VideoCard';
import { searchPosts } from '../../../lib/appwrite';
import SearchInput from '../../../components/SearchInput';
import EmptyState from '../../../components/EmptyState';
import useAppwrite from '../../../lib/useAppwrite';
const SearchBookmark = () => {
    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

    useEffect(() => {
        refetch()
    }, [query])


    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                        creator={item.creator}
                        isBookmarkPage={true}
                        bookmarks={item.bookmarks}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 '>
                        <Text className='font-pmedium text-sm text-gray-100' >
                            Search Result,
                        </Text>
                        <Text className='text-2xl font-psemibold text-white'>
                            {query}
                        </Text>
                        <View className='mt-6 mb-8'>
                            <SearchInput
                                initialValue={query}
                                searchRoute='/search/bookmark'

                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() =>
                    <EmptyState
                        title='No videos found'
                        subtitle='No videos found for this search query'
                    />}
            />
        </SafeAreaView >
    );
};
export default SearchBookmark;