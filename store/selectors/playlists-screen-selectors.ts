import { IPlaylist, PlaylistType } from '@interfaces/playlists-screen-interfaces';

import { IApplicationState } from '@store/interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { useSelector } from 'react-redux';

export function useGetPlaylists() {
    return useSelector<IApplicationState, IPlaylist[]>(state => state.playlists.playlists);
}

export function useGetPlaylistByTypeSelector(type: PlaylistType) {
    return useSelector<IApplicationState, IPlaylist | undefined>(state => state.playlists.playlists.find(playlist => playlist.type === 'last-played'));
}