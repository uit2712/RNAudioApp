import { IArtist } from '../../interfaces/artists-screen-interfaces';
import { IPlaylist } from '../../interfaces/playlists-screen-interfaces';

export interface IPlaylistsScreenState {
    playlists: IPlaylist[];
}

export interface IArtistsScreenState {
    artists: IArtist[];
    isLoadListArtistsFirstTime: boolean;
}

export interface IApplicationState {
    playlists: IPlaylistsScreenState;
    artists: IArtistsScreenState;
}