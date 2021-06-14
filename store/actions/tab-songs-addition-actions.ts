import { Dispatch } from 'redux';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { ISelectedSongs } from '@interfaces/tab-songs-addition-interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { addListAudioToPlaylistAction } from './playlists-screen-actions';

export type TabSongsAdditionActions = {
    type: 'SET_LIST_SELECTED_SONGS';
    payload: ISelectedSongs;
} | {
    type: 'CLEAR_LIST_SELECTED_SONGS';
} | {
    type: 'SET_PLAYLIST_SONGS_SHOULD_BE_ADDED';
    payload?: IPlaylist;
} | {
    type: 'ADD_LIST_SELECTED_SONGS_TO_PLAYLIST';
}

export const setListSelectedSongsAction = (request: ISelectedSongs): TabSongsAdditionActions => ({
    type: 'SET_LIST_SELECTED_SONGS',
    payload: request,
});

export const clearListSelectedSongsAction = (): TabSongsAdditionActions => ({
    type: 'CLEAR_LIST_SELECTED_SONGS',
});

export const setPlaylistSongsShouldBeAddedAction = (request?: IPlaylist): TabSongsAdditionActions => ({
    type: 'SET_PLAYLIST_SONGS_SHOULD_BE_ADDED',
    payload: request,
});

export const addListSelectedSongsToPlaylistAction = (playlistId: string, listAudio: SoundFileType[]) => (dispatch: Dispatch) => {
    dispatch(addListAudioToPlaylistAction({
        playlistId,
        listAudio,
    }))
    dispatch(clearListSelectedSongsAction());
}