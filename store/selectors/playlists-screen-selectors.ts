import { useSelector } from 'react-redux';
import { IPlaylist } from '../../interfaces/playlists-screen-interfaces';
import { IApplicationState } from '../interfaces';

export function useGetPlaylists() {
    return useSelector<IApplicationState, IPlaylist[]>(state => state.playlists.playlists);
}