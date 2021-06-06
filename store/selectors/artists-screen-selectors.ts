import { IApplicationState } from '../interfaces';
import { IArtist } from '../../interfaces/artists-screen-interfaces';
import { useSelector } from 'react-redux';

export function useGetAllArtistsSelector() {
    return useSelector<IApplicationState, { artists: IArtist[], isLoadFirstTime: boolean }>(state => ({
        artists: state.artists.artists,
        isLoadFirstTime: state.artists.isLoadListArtistsFirstTime,
    }));
}