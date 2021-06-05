import * as React from 'react';
import { View, Text } from 'react-native';
import { useGetPlaylists } from '../store/selectors/playlists-screen-selectors';

function PlaylistsScreen() {
    const playlists = useGetPlaylists();
    console.log(playlists);
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default PlaylistsScreen;