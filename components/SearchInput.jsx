import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { colors } from '../constants/global'
import { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'
const SearchInput = ({ initialValue }) => {

    const pathname = usePathname()
    const [query, setQuery] = useState(initialValue || '')
    return (

        <View className='w-full flex-row border-2 border-black-200 bg-black-100 rounded-2xl h-16 px-4 focus:border-secondary items-center space-x-4'>
            <TextInput
                className='flex-1 text-white font-pregular text-base mt-0.5'
                value={query}
                placeholder='Search for a Video'
                placeholderTextColor={colors.textMuted}
                onChangeText={(e) => setQuery(e)}
            />
            <TouchableOpacity
                onPress={() => {
                    if (query === "")
                        return Alert.alert(
                            "Missing Query",
                            "Please input something to search results across database"
                        );

                    if (pathname.startsWith("/search")) router.setParams({ query });
                    else router.push(`/search/${query}`);
                }}
            >
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