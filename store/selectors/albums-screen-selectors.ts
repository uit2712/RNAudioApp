import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IApplicationState } from '@store/interfaces';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllAlbumsSelector() {
    return useSelector<IApplicationState, { albums: IAlbum[], isLoadFirstTime: boolean }>(state => ({
        albums: state.albums.albums,
        isLoadFirstTime: state.albums.isLoadListAlbumsFirstTime,
    }));
}

export function useGetSearchedAlbumsSelector() {
    const searchText = useGetSearchTextSelector();
    return useSelector<IApplicationState, IAlbum[]>(state => {
        const albums = state.albums.albums;
        if (!searchText) {
            return albums;
        }

        return albums.filter(item => item.album.includes(searchText) === true);
    });
}