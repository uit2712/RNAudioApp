import { SoundFileType } from 'types/songs-screen-types';

export type CommonActions = {
    type: 'SET_CURRENT_LIST_SONGS';
    payload: SoundFileType[];
}

export const setCurrentListSoundsAction = (request: SoundFileType[]): CommonActions => ({
    type: 'SET_CURRENT_LIST_SONGS',
    payload: request,
});