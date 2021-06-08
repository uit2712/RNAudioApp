import { IApplicationState } from '@store/interfaces';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { useSelector } from 'react-redux';

export function useGetPlaylists() {
    return useSelector<IApplicationState, IPlaylist[]>(state => state.playlists.playlists);
}