import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {

    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='min-h-[80vh] justify-center w-full px-4 my-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[130px] h-[84px]'
                    />
                    <Text className='text-2xl mt-10 text-white font-psemibold'>
                        Log in to your account
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChange={(text) => setForm({ ...form, email: text })}
                        styles="mt-7"
                        type='email'
                        placeholder={'Enter your Email'}
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChange={(text) => setForm({ ...form, password: text })}
                        styles="mt-7"
                        type='password'
                        placeholder={'Enter your Password'}

                    />
                    <CustomButton
                        title={'Sign In'}
                        handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have an account?{' '}
                            <Link
                                href="/sign-up"
                                className='text-secondary font-psemibold'
                            >
                                Sign Up
                            </Link>
                        </Text>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignIn;
