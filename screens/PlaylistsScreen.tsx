import * as React from 'react';
import { View, Text } from 'react-native';
import { useGetAllPlaylists } from '../hooks';

function PlaylistsScreen() {
    const { playlists } = useGetAllPlaylists();

    return (
        <View>
            <Text>{JSON.stringify(playlists)}</Text>
        </View>
    )
}

export default PlaylistsScreen;