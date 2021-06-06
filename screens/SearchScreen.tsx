import * as React from 'react';
import { View, Text, } from 'react-native';
import { useHomeBottomTabHelper } from '../hooks';

function SearchScreen() {
    useHomeBottomTabHelper();

    return (
        <View>
            <Text>description</Text>
        </View>
    )
}

export default SearchScreen;