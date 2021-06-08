import { SoundFileType } from 'types/songs-screen-types';

export type SongsScreenActions = {
    type: 'SET_LIST_SONGS';
    payload: SoundFileType[];
}

export const setListSongs = (request: SoundFileType[]): SongsScreenActions => ({
    type: 'SET_LIST_SONGS',
    payload: request,
});