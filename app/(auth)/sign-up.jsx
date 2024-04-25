import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
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
                        Sign Up to Aora
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChange={(text) => setForm({ ...form, email: text })}
                        styles="mt-7"
                        type='email'

                    />
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChange={(text) => setForm({ ...form, username: text })}
                        styles="mt-7"
                        type='text'
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChange={(text) => setForm({ ...form, password: text })}
                        styles="mt-7"
                        type='password'


                    />
                    <CustomButton
                        title={'Sign Up'}
                        handlePress={submit}
                        containerStyle='mt-7'
                        isLoading={isSubmitting}
                    />

                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Have an account already?{' '}
                            <Link
                                href="/sign-in"
                                className='text-secondary font-psemibold'
                            >
                                Sign In
                            </Link>
                        </Text>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignUp;
