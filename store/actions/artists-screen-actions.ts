import { IArtist } from '@interfaces/artists-screen-interfaces';
import { SortArtistByPropertyType } from 'types/artists-screen-types';
import { SortOrderType } from 'types/index';

export type ArtistsScreenActions = {
    type: 'SET_LIST_ARTISTS';
    payload: IArtist[];
} | {
    type: 'SET_ARTIST_ORDER_TYPE';
    payload: SortOrderType;
} | {
    type: 'SET_SORT_BY_PROPERTY_TYPE';
    payload: SortArtistByPropertyType;
}

export const setListArtists = (request: IArtist[]): ArtistsScreenActions => ({
    type: 'SET_LIST_ARTISTS',
    payload: request,
});

export const setArtistOrderType = (request: SortOrderType): ArtistsScreenActions => ({
    type: 'SET_ARTIST_ORDER_TYPE',
    payload: request,
});

export const setArtistByPropertyType = (request: SortArtistByPropertyType): ArtistsScreenActions => ({
    type: 'SET_SORT_BY_PROPERTY_TYPE',
    payload: request,
});