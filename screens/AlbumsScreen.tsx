import * as React from 'react';
import { View, Text } from 'react-native';
import { useGetAllAlbums } from '../hooks';

function AlbumsScreen() {
    const albums = useGetAllAlbums();

    return (
        <View>
            <Text>{JSON.stringify(albums)}</Text>
        </View>
    )
}

export default AlbumsScreen;