import { IPlaylist, PlaylistType } from '@interfaces/playlists-screen-interfaces';

import { IApplicationState } from '@store/interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { useSelector } from 'react-redux';

export function useGetPlaylists() {
    return useSelector<IApplicationState, IPlaylist[]>(state => state.playlists.playlists);
}

export function useIsAudioFromFavoritePlaylistSelector(audioId: string) {
    return useSelector<IApplicationState, boolean>(state => {
        const favoritePlaylist = state.playlists.playlists.find(item => item.type === 'favorite');
        if (favoritePlaylist) {
            const isExists = favoritePlaylist.listSongs.find(item => item.id === audioId) !== undefined;
            return isExists;
        }

        return false;
    });
}