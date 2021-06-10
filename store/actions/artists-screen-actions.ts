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
    type: 'SET_ARTIST_SORT_BY_PROPERTY_TYPE';
    payload: SortArtistByPropertyType;
}

export const setListArtistsAction = (request: IArtist[]): ArtistsScreenActions => ({
    type: 'SET_LIST_ARTISTS',
    payload: request,
});

export const setArtistOrderTypeAction = (request: SortOrderType): ArtistsScreenActions => ({
    type: 'SET_ARTIST_ORDER_TYPE',
    payload: request,
});

export const setArtistByPropertyTypeAction = (request: SortArtistByPropertyType): ArtistsScreenActions => ({
    type: 'SET_ARTIST_SORT_BY_PROPERTY_TYPE',
    payload: request,
});