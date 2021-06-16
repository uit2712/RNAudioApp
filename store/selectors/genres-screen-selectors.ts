import { IApplicationState } from '@store/interfaces';
import { IGenre } from '@interfaces/genres-screen-interfaces';
import { SortGenreByPropertyType } from 'types/genres-screen-types';
import { SortOrderType } from 'types/index';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetListGenresSelector() {
    return useSelector<IApplicationState, { genres: IGenre[], isLoadFirstTime: boolean }>(state => ({
        genres: state.genres.genres,
        isLoadFirstTime: state.genres.isLoadListGenresFirstTime,
    }));
}

export function useGetGenreOrderTypeSelector() {
    return useSelector<IApplicationState, SortOrderType>(state => {
        return state.genres.orderType;
    });
}

export function useGetGenreSortByPropertyTypeSelector() {
    return useSelector<IApplicationState, SortGenreByPropertyType>(state => {
        return state.genres.sortByProperyType;
    });
}

export function useGetSearchedAlbumsSelector() {
    const searchText = useGetSearchTextSelector();
    return useSelector<IApplicationState, IGenre[]>(state => {
        const genres = state.genres.genres;
        if (!searchText) {
            return genres;
        }

        return genres.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) === true);
    });
}