import { IPlaylist } from '../../interfaces/playlists-screen-interfaces';

export interface IPlaylistsScreenState {
    playlists: IPlaylist[];
}

export interface IApplicationState {
    playlists: IPlaylistsScreenState;
}