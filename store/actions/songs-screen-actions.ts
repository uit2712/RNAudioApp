import { SortSongByPropertyType, SoundFileType } from 'types/songs-screen-types';

import { SortOrderType } from 'types/index';

export type SongsScreenActions = {
    type: 'SET_LIST_SONGS';
    payload: SoundFileType[];
} | {
    type: 'SET_SONG_ORDER_TYPE';
    payload: SortOrderType;
} | {
    type: 'SET_SONG_SORT_BY_PROPERTY_TYPE';
    payload: SortSongByPropertyType;
}

export const setListSongsAction = (request: SoundFileType[]): SongsScreenActions => ({
    type: 'SET_LIST_SONGS',
    payload: request,
});

export const setSongOrderTypeAction = (request: SortOrderType): SongsScreenActions => ({
    type: 'SET_SONG_ORDER_TYPE',
    payload: request,
});

export const setSortSongByPropertyTypeAction = (request: SortSongByPropertyType): SongsScreenActions => ({
    type: 'SET_SONG_SORT_BY_PROPERTY_TYPE',
    payload: request,
});