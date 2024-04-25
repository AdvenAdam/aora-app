import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { colors } from '../constants/global'
import { useState } from 'react'
import { icons } from '../constants'
const FormField = ({ title, value, handleChange, styles, type, placeholder, ...props }) => {
    const [showInput, setShowInput] = useState(false)
    return (
        <View className={`space-y-2 ${styles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View className='w-full flex-row border-2 border-black-200 bg-black-100 rounded-2xl h-16 px-4 focus:border-secondary items-center'>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textMuted}
                    onChangeText={handleChange}
                    secureTextEntry={type === 'password' && !showInput}
                />
                {
                    type === 'password' && (
                        <TouchableOpacity onPress={() => setShowInput(!showInput)}>
                            <Image
                                source={showInput ? icons.eyeHide : icons.eye}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>

    )
}
export default FormField