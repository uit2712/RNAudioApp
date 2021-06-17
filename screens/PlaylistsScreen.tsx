import * as React from 'react';

import { useAddLastPlayedAudioToPlaylists, useRemovePlaylistContext } from '@hooks/playlists-screen-hooks';

import { FlatList, } from 'react-native';
import PlaylistCreation from '@components/playlists-screen/PlaylistCreation';
import PlaylistsItem from '@components/playlists-screen/PlaylistsItem';
import { RemovePlaylistContext } from '@context-api/playlists-screen-context-api';
import RemovePlaylistWarningModal from '@components/playlists-screen/RemovePlaylistWarningModal';
import { useGetVisiblePlaylistsSelector } from '@store/selectors/playlists-screen-selectors';

function PlaylistsScreen() {
    const playlists = useGetVisiblePlaylistsSelector();
    const removePlaylistContext = useRemovePlaylistContext();
    useAddLastPlayedAudioToPlaylists();

    return (
        <RemovePlaylistContext.Provider value={removePlaylistContext}>
            <FlatList
                data={playlists}
                style={{
                    paddingHorizontal: 10,
                }}
                renderItem={({ item }) => (
                    <PlaylistsItem
                        key={item.id}
                        value={item}
                    />
                )}
                keyExtractor={item=> item.id}
            />
            <PlaylistCreation/>
            <RemovePlaylistWarningModal/>
        </RemovePlaylistContext.Provider>
    )
}



export default PlaylistsScreen;