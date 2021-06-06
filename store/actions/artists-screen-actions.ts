import { IArtist } from '../../interfaces/artists-screen-interfaces';

export type ArtistsScreenActions = {
    type: 'SET_LIST_ARTISTS';
    payload: IArtist[];
}

export const setListArtists = (request: IArtist[]): ArtistsScreenActions => ({
    type: 'SET_LIST_ARTISTS',
    payload: request,
});