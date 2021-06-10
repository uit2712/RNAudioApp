import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { SortAlbumByPropertyType } from 'types/albums-screen-types';
import { SortOrderType } from 'types/index';

export type AlbumsScreenActions = {
    type: 'SET_LIST_ALBUMS';
    payload: IAlbum[];
} | {
    type: 'SET_ALBUM_ORDER_TYPE';
    payload: SortOrderType;
} | {
    type: 'SET_ALBUM_SORT_BY_PROPERTY_TYPE';
    payload: SortAlbumByPropertyType;
}

export const setListAlbumsAction = (request: IAlbum[]): AlbumsScreenActions => ({
    type: 'SET_LIST_ALBUMS',
    payload: request,
});

export const setAlbumOrderTypeAction = (request: SortOrderType): AlbumsScreenActions => ({
    type: 'SET_ALBUM_ORDER_TYPE',
    payload: request,
});

export const setAlbumByPropertyTypeAction = (request: SortAlbumByPropertyType): AlbumsScreenActions => ({
    type: 'SET_ALBUM_SORT_BY_PROPERTY_TYPE',
    payload: request,
});