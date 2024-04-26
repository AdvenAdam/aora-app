import { View, Text, Image } from 'react-native'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({ title, subtitle }) => {

    return (
        <View className='px-4 items-center justify-center'>
            <Image
                source={images.empty}
                className='w-[300px] h-[300px]'
                resizeMode='contain'
            />
            <Text className='text-xl font-psemibold text-white mt-2'>
                {title}
            </Text>
            <Text className='font-pmedium text-sm text-gray-100' >
                {subtitle}
            </Text>
            <CustomButton
                title='Get Started'
                handlePress={() => { router.push('/home') }}
                containerStyle="w-full my-3 "
            />
        </View>
    )
}
export default EmptyState