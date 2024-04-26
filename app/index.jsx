
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/global';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';



const App = () => {
    const { isLoading, isLoggedIn } = useGlobalContext();
    if (!isLoading && isLoggedIn) return <Redirect href="/home" />

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='items-center justify-center h-[85vh] w-full px-4'>
                    <Image
                        source={images.logo}
                        className='w-[130px] h-[84px]'
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className='max-w-[300px] ma x-h-[300px] w-full h-full'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-white text-3xl text-center font-bold'>
                            Discover Endless {"\n"} Posibility with{' '} <Text className='text-secondary-200'>Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                            resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm text-gray-100 text-center mt-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda distinctio molestiae numquam enim magnam. ~~AORAAA~~</Text>
                    <CustomButton
                        title='Continue with Email'
                        handlePress={() => { router.push('/sign-in') }}
                        containerStyle="w-full mt-7"
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor={colors.background} style='light' />
        </SafeAreaView>
    );
};
export default App;
