import { IAlbum } from '../../interfaces/albums-screen-interfaces';

export type AlbumsScreenActions = {
    type: 'SET_LIST_ALBUMS';
    payload: IAlbum[];
}

export const setListAlbums = (request: IAlbum[]): AlbumsScreenActions => ({
    type: 'SET_LIST_ALBUMS',
    payload: request,
});