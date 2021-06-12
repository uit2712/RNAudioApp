import { NavigatorScreenParams, RouteProp, } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IPlaylist, } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';

export interface IListSongsDetailScreenParams extends IScreenParams {
    info: IPlaylist;
    isReverseListSongs?: boolean;
}

export type TabListSongsDetailParams = {
    ListSongs: IListSongsDetailScreenParams;
}

export type TabListSongsDetailNavigationProp = BottomTabNavigationProp<TabListSongsDetailParams>;
export type TabListSongsDetailNavigatorScreenParams = NavigatorScreenParams<TabListSongsDetailParams>;
export type ListSongsDetailScreenRouteProp = RouteProp<TabListSongsDetailParams, 'ListSongs'>;