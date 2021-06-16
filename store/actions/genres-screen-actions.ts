import { IGenre } from '@interfaces/genres-screen-interfaces';
import { SortGenreByPropertyType } from 'types/genres-screen-types';
import { SortOrderType } from 'types/index';

export type GenresScreenActions = {
    type: 'SET_LIST_GENRES';
    payload: IGenre[];
} | {
    type: 'SET_GENRE_ORDER_TYPE';
    payload: SortOrderType;
} | {
    type: 'SET_GENRE_SORT_BY_PROPERTY_TYPE';
    payload: SortGenreByPropertyType;
}

export const setListGenresAction = (request: IGenre[]): GenresScreenActions => ({
    type: 'SET_LIST_GENRES',
    payload: request,
});

export const setGenreOrderTypeAction = (request: SortOrderType): GenresScreenActions => ({
    type: 'SET_GENRE_ORDER_TYPE',
    payload: request,
});

export const setGenreByPropertyTypeAction = (request: SortGenreByPropertyType): GenresScreenActions => ({
    type: 'SET_GENRE_SORT_BY_PROPERTY_TYPE',
    payload: request,
});