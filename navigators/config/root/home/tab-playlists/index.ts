import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '../../../../route-params';

export interface IPlaylistsScreenParams extends IScreenParams {
}

export type TabPlaylistsParams = {
    Playlists: IPlaylistsScreenParams;
}

export type TabPlaylistsNavigationProp = BottomTabNavigationProp<TabPlaylistsParams>;
export type TabPlaylistsNavigatorScreenParams = NavigatorScreenParams<TabPlaylistsParams>;
export type PlaylistsScreenRouteProp = RouteProp<TabPlaylistsParams, 'Playlists'>;