import { IApplicationState } from '@store/interfaces';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { distinct } from '@functions/tab-songs-addition-functions';
import { useSelector } from 'react-redux';

export function useGetPlaylistSongsShouldBeAddedSelector() {
    return useSelector<IApplicationState, IPlaylist | undefined>(state => state.songsAddition.playlist);
}

export function useGetListSelectedSongsSelector() {
    const emptyArr: SoundFileType[] = [];
    return useSelector<IApplicationState, SoundFileType[]>(state => {
        const listSongs = emptyArr.concat.apply([], state.songsAddition.listSelectedSongsInPlaylists.map(item => item.listSongs));
        return distinct(listSongs, 'id');
    });
}

export function useIsAddListSelectedSongsSuccessSelector() {
    return useSelector<IApplicationState, boolean>(state => state.songsAddition.isAdded);
}