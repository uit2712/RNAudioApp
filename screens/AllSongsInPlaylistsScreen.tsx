import * as React from 'react';

import { AllSongsInPlaylistsScreenRouteProp } from '@navigators/config/drawer-home/tab-songs-addition/tab-songs-in-playlists';
import SongsInPlaylists from '@components/tab-songs-addition/SongsInPlaylists';
import { setPlaylistSongsShouldBeAddedAction } from '@store/actions/tab-songs-addition-actions';
import { useDispatch } from 'react-redux';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';
import { useRoute } from '@react-navigation/native';

function AllSongsInPlaylistsScreen() {
    const route = useRoute<AllSongsInPlaylistsScreenRouteProp>();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setPlaylistSongsShouldBeAddedAction(route.params?.playlist));
    }, [route.params?.playlist]);
    const { songs } = useGetAllSongsSelector();

    return (
        <SongsInPlaylists
            type='all'
            listSongs={songs}
        />
    )
}


export default AllSongsInPlaylistsScreen;