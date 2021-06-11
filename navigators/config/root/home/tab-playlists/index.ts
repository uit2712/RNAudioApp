import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IPlaylist, } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';

export interface IPlaylistsScreenParams extends IScreenParams {
}

export interface IPlaylistsDetailScreenParams extends IScreenParams {
    info: IPlaylist;
}

export type TabPlaylistsParams = {
    Playlists: IPlaylistsScreenParams;
    Detail: IPlaylistsDetailScreenParams;
}

export type TabPlaylistsNavigationProp = BottomTabNavigationProp<TabPlaylistsParams>;
export type TabPlaylistsNavigatorScreenParams = NavigatorScreenParams<TabPlaylistsParams>;
export type PlaylistsDetailScreenRouteProp = RouteProp<TabPlaylistsParams, 'Detail'>;