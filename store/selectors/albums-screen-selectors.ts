import { IAlbum } from '../../interfaces/albums-screen-interfaces';
import { IApplicationState } from '../interfaces';
import { useSelector } from 'react-redux';

export function useGetAllAlbumsSelector() {
    return useSelector<IApplicationState, { albums: IAlbum[], isLoadFirstTime: boolean }>(state => ({
        albums: state.albums.albums,
        isLoadFirstTime: state.albums.isLoadListAlbumsFirstTime,
    }));
}