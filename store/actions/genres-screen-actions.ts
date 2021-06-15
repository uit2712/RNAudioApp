import { IGenre } from '@interfaces/genres-screen-interfaces';

export type GenresScreenActions = {
    type: 'SET_LIST_GENRES';
    payload: IGenre[];
}

export const setListGenresAction = (request: IGenre[]): GenresScreenActions => ({
    type: 'SET_LIST_GENRES',
    payload: request,
});