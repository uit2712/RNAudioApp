import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IApplicationState } from '@store/interfaces';
import { SortAlbumByPropertyType } from 'types/albums-screen-types';
import { SortOrderType } from 'types/index';
import { dynamicSortMultiple } from '@functions/index';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllAlbumsSelector() {
    return useSelector<IApplicationState, { albums: IAlbum[], isLoadFirstTime: boolean }>(state => {
        const orderStr = state.albums.orderType === 'asc' ? '' : '-';
        const albums = state.albums.albums.sort(dynamicSortMultiple(orderStr + state.albums.sortByProperyType, orderStr + 'name'));

        return {
            albums,
            isLoadFirstTime: state.albums.isLoadListAlbumsFirstTime,
        }
    });
}

export function useGetAlbumOrderTypeSelector() {
    return useSelector<IApplicationState, SortOrderType>(state => {
        return state.albums.orderType;
    });
}

export function useGetAlbumSortByPropertyTypeSelector() {
    return useSelector<IApplicationState, SortAlbumByPropertyType>(state => {
        return state.albums.sortByProperyType;
    });
}

export function useGetSearchedAlbumsSelector() {
    const searchText = useGetSearchTextSelector();
    return useSelector<IApplicationState, IAlbum[]>(state => {
        const albums = state.albums.albums;
        if (!searchText) {
            return albums;
        }

        return albums.filter(item => item.album.toLowerCase().includes(searchText.toLowerCase()) === true);
    });
}

export function useGetAlbumByIdSelector(id?: string) {
    return useSelector<IApplicationState, IAlbum | undefined>(state => state.albums.albums.find(item => item.id === id));
}