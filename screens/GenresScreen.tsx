import * as React from 'react';

import { Text, View } from 'react-native';

import { useGetListGenresSelector } from '@store/selectors/genres-screen-selectors';

function GenresScreen() {
    const { genres } = useGetListGenresSelector();
    console.log(genres);
    
    return (
        <View>
            <Text>description</Text>
        </View>
    )
}

export default GenresScreen;