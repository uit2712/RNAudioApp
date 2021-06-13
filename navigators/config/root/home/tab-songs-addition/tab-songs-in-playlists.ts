import { NavigatorScreenParams, RouteProp, } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';

export interface IAllSongsInPlaylistsScreenParams extends IScreenParams {
    playlist?: IPlaylist;
}

export interface IMostPlayedSongsInPlaylistsScreenParams extends IScreenParams {
}

export interface ILastPlayedSongsInPlaylistsScreenParams extends IScreenParams {
}

export type TabSongsInPlaylistsParams = {
    All?: IAllSongsInPlaylistsScreenParams;
    MostPlayed?: IMostPlayedSongsInPlaylistsScreenParams;
    LastPlayed?: ILastPlayedSongsInPlaylistsScreenParams;
}

export type TabSongsInPlaylistsNavigationProp = BottomTabNavigationProp<TabSongsInPlaylistsParams>;
export type TabSongsInPlaylistsNavigatorScreenParams = NavigatorScreenParams<TabSongsInPlaylistsParams>;
export type AllSongsInPlaylistsScreenRouteProp = RouteProp<TabSongsInPlaylistsParams, 'All'>;