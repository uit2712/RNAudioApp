import { SortSongByPropertyType, SoundFileType } from 'types/songs-screen-types';

import { SortOrderType } from 'types/index';

export type SongsScreenActions = {
    type: 'SET_LIST_SONGS';
    payload: SoundFileType[];
} | {
    type: 'SET_ORDER_TYPE';
    payload: SortOrderType;
} | {
    type: 'SET_SORT_BY_PROPERTY_TYPE';
    payload: SortSongByPropertyType;
}

export const setListSongs = (request: SoundFileType[]): SongsScreenActions => ({
    type: 'SET_LIST_SONGS',
    payload: request,
});

export const setOrderType = (request: SortOrderType): SongsScreenActions => ({
    type: 'SET_ORDER_TYPE',
    payload: request,
});

export const setSortSongByPropertyType = (request: SortSongByPropertyType): SongsScreenActions => ({
    type: 'SET_SORT_BY_PROPERTY_TYPE',
    payload: request,
});