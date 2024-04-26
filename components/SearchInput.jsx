import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { colors } from '../constants/global'
import { useState } from 'react'
import { icons } from '../constants'
const SearchInput = ({ title, value, handleChange, styles, type, ...props }) => {
    const [showInput, setShowInput] = useState(false)
    return (

        <View className='w-full flex-row border-2 border-black-200 bg-black-100 rounded-2xl h-16 px-4 focus:border-secondary items-center space-x-4'>
            <TextInput
                className='flex-1 text-white font-pregular text-base mt-0.5'
                value={value}
                placeholder='Search for a Video'
                placeholderTextColor={colors.textMuted}
                onChangeText={handleChange}
                secureTextEntry={type === 'password' && !showInput}
            />
            <TouchableOpacity >
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>

        </View>

    )
}
export default SearchInput