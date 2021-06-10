import { SortSongByPropertyType, SoundFileType } from 'types/songs-screen-types';

import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { SortArtistByPropertyType } from 'types/artists-screen-types';
import { SortOrderType } from 'types/index';

export interface IPlaylistsScreenState {
    playlists: IPlaylist[];
}

export interface IArtistsScreenState {
    artists: IArtist[];
    isLoadListArtistsFirstTime: boolean;
    orderType: SortOrderType;
    sortByProperyType: SortArtistByPropertyType;
}

export interface IAlbumsScreenState {
    albums: IAlbum[];
    isLoadListAlbumsFirstTime: boolean;
}

export interface ISongsScreenState {
    songs: SoundFileType[];
    isLoadListSongsFirstTime: boolean;
    orderType: SortOrderType;
    sortByProperyType: SortSongByPropertyType;
}

export interface ISearchScreenState {
    searchText: string;
}

export interface ICommonState {
    isShowSortByBottomSheet: boolean;
}

export interface IApplicationState {
    playlists: IPlaylistsScreenState;
    artists: IArtistsScreenState;
    albums: IAlbumsScreenState;
    songs: ISongsScreenState;
    search: ISearchScreenState;
    common: ICommonState;
}