import { IApplicationState } from '@store/interfaces';
import { IPlaylist, } from '@interfaces/playlists-screen-interfaces';
import { PlaylistType } from 'types/playlists-screen-types';
import { useSelector } from 'react-redux';

export function useGetPlaylistsSelector() {
    return useSelector<IApplicationState, IPlaylist[]>(state => state.playlists.playlists.filter(item => !item.isHidden));
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

export function useGetPlaylistByTypeSelector(type: PlaylistType) {
    return useSelector<IApplicationState, IPlaylist | undefined>(state => {
        const favoritePlaylist = state.playlists.playlists.find(item => item.type === type);
        return favoritePlaylist;
    });
}

export function useGetPlaylistByIdSelector(id: string) {
    return useSelector<IApplicationState, IPlaylist | undefined>(state => {
        const playlist = state.playlists.playlists.find(item => item.id === id);
        return playlist;
    });
}

export function useGetPlaylistsNotContainAudioSelector(audioId: string) {
    return useSelector<IApplicationState, IPlaylist[]>(state => {
        return state.playlists.playlists.filter(item => item.type === 'custom-playlist' && item.listSongs.findIndex(song => song.id === audioId) < 0);
    });
}