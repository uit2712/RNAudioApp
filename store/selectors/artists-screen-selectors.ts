import { useSelector } from 'react-redux';
import { IArtist } from '../../interfaces/artists-screen-interfaces';
import { IApplicationState } from '../interfaces';

export function useGetAllArtistsSelector() {
    return useSelector<IApplicationState, { artists: IArtist[], isLoadFirstTime: boolean }>(state => ({
        artists: state.artists.artists,
        isLoadFirstTime: state.artists.isLoadListArtistsFirstTime,
    }));
}