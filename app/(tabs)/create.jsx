import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import { useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { createVideo } from '../../lib/appwrite';
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
    const [isUploading, setIsUploading] = useState(false)
    const { user } = useGlobalContext()
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
    })
    const openPicker = async (selectType) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            if (selectType === 'image') {
                setForm({ ...form, thumbnail: result.assets[0] });
            }
            if (selectType === 'video') {
                setForm({ ...form, video: result.assets[0] });
            }
        }
    }
    const submit = async () => {
        if (!form.title || !form.video || !form.prompt || !form.thumbnail) {
            Alert.alert('Please fill all the fields');
        }

        setIsUploading(true);
        try {
            await createVideo({
                ...form, creator: user.$id
            });

            Alert.alert('Success', 'Post uploaded successfully');
            router.push('/home');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
                prompt: ''
            });
            setIsUploading(false);
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className='px-4 mt-6 '>
                <Text className=' text-2xl text-white font-psemibold'>
                    Upload Video
                </Text>

                <FormField
                    title={'Video Title'}
                    value={form.title}
                    placeholder='Give a catchy title ...'
                    handleChange={(text) => setForm({ ...form, title: text })}
                    styles='mt-10'
                />
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Upload Video
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('video')}
                    >
                        {form.video ? (
                            <Video
                                source={{ uri: form.video.uri }}
                                className='h-64 w-full rounded-2xl'
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                            />
                        ) : (
                            <View className='h-40 w-full bg-black-100 rounded-2xl justify-center items-center'>
                                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                    <Image
                                        source={icons.upload}
                                        className='h-1/2 w-1/2'
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View className='mt-7 space-y-2'>
                    <Text className='text-base text-gray-100 font-pmedium'>
                        Thumbnail Image
                    </Text>
                    <TouchableOpacity
                        onPress={() => openPicker('image')}
                    >
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                className='w-full h-64 rounded-2xl'
                            />
                        ) : (
                            <View
                                className='h-20 px-4 w-full bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'
                            >
                                <Image
                                    source={icons.upload}
                                    className='w-5 h-5'
                                    resizeMode='contain'
                                />
                                <Text className='text-sm text-gray-100 font-pmedium'>
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <FormField
                    title='AI Prompt'
                    value={form.prompt}
                    placeholder='The prompt you use to create a video'
                    handleChange={(text) => setForm({ ...form, prompt: text })}
                    styles='mt-10'
                />
                <CustomButton
                    title='Create & Submit'
                    handlePress={submit}
                    containerStyle='my-7 '
                    isLoading={isUploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default Create;
