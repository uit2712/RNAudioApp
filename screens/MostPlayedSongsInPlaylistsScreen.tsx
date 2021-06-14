import * as React from 'react';

import SongsInPlaylists from '@components/tab-songs-addition/SongsInPlaylists';
import { useGetPlaylistByTypeSelector } from '@store/selectors/playlists-screen-selectors';

function MostPlayedSongsInPlaylistsScreen() {
    const playlist = useGetPlaylistByTypeSelector('most-played');
    if (!playlist || playlist.listSongs.length === 0) {
        return null
    }

    return (
        <SongsInPlaylists
            type='most-played'
            listSongs={playlist.listSongs}
        />
    )
}

export default MostPlayedSongsInPlaylistsScreen;