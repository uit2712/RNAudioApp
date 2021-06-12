import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IPlaylist, } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';

export interface IPlaylistsScreenParams extends IScreenParams {
}

export type TabPlaylistsParams = {
    Playlists: IPlaylistsScreenParams;
}

export type TabPlaylistsNavigationProp = BottomTabNavigationProp<TabPlaylistsParams>;
export type TabPlaylistsNavigatorScreenParams = NavigatorScreenParams<TabPlaylistsParams>;