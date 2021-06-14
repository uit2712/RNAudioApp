import * as React from 'react';

import SongsInPlaylists from '@components/tab-songs-addition/SongsInPlaylists';
import { useGetPlaylistByTypeSelector } from '@store/selectors/playlists-screen-selectors';

function LastPlayedSongsInPlaylistsScreen() {
    const playlist = useGetPlaylistByTypeSelector('last-played');
    if (!playlist || playlist.listSongs.length === 0) {
        return null
    }

    return (
        <SongsInPlaylists
            type='last-played'
            listSongs={playlist.listSongs}
        />
    )
}

export default LastPlayedSongsInPlaylistsScreen;