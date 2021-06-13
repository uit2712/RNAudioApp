import * as React from 'react';

import { Text, View } from 'react-native';

import { AllSongsInPlaylistsScreenRouteProp } from '@navigators/config/root/home/tab-songs-addition/tab-songs-in-playlists';
import { useRoute } from '@react-navigation/native';

function AllSongsInPlaylistsScreen() {
    const route = useRoute<AllSongsInPlaylistsScreenRouteProp>();
    console.log(route.params?.playlist);

    return (
        <View>
            <Text>AllSongsInPlaylistsScreen</Text>
        </View>
    )
}

export default AllSongsInPlaylistsScreen;