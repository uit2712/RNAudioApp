import * as React from 'react';
import { View, Text } from 'react-native';
import { useGetAllArtists } from '../hooks';

function ArtistsScreen() {
    const { artists } = useGetAllArtists();
    console.log(artists);

    return (
        <View>
            <Text>{JSON.stringify(artists)}</Text>
        </View>
    )
}

export default ArtistsScreen;