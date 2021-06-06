import * as React from 'react';

import { Text, View, } from 'react-native';

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