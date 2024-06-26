import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { getUsersPosts, signOut } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
const Profile = () => {
    const { setIsLoggedIn, user, setUser } = useGlobalContext();
    const { data: posts } = useAppwrite(() => getUsersPosts(user.$id));
    const logout = async () => {
        await signOut()
        setUser(null);
        setIsLoggedIn(false);
        router.replace('/sign-in');
    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} creator={item.creator} />}
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4 '>
                        <TouchableOpacity
                            className='w-full items-end mb-10'
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
                            <Image
                                source={{ uri: user?.avatar }}
                                className='w-[90%] h-[90%] rounded-lg'
                                resizeMode='cover'
                            />
                        </View>
                        <InfoBox
                            title={user?.username}
                            containerStyles='mt-5'
                            titleStyles='text-lg'
                        />
                        <View className='flex-row'>
                            <InfoBox
                                title={posts?.length || 0}
                                subtitle='Posts'
                                containerStyles='mr-10'
                                titleStyles='text-2xl'
                            />
                            <InfoBox
                                title={'2.5K'}
                                subtitle='Followers'
                                titleStyles='text-2xl'
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
export default Profile;
