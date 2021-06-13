import { IApplicationState } from '@store/interfaces';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { useSelector } from 'react-redux';

export function useGetPlaylistSongsShouldBeAddedSelector() {
    return useSelector<IApplicationState, IPlaylist | undefined>(state => state.songsAddition.playlist);
}