import { NavigatorScreenParams, RouteProp, } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IListSongsDetail } from '@interfaces/index';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';
import { ListSongsDetailType } from 'types/index';

export interface IListSongsDetailScreenParams extends IScreenParams {
    type: ListSongsDetailType;
    info: IListSongsDetail;
    isReverseListSongs?: boolean;
    playlist?: IPlaylist;
}

export type TabListSongsDetailParams = {
    ListSongs: IListSongsDetailScreenParams;
}

export type TabListSongsDetailNavigationProp = BottomTabNavigationProp<TabListSongsDetailParams>;
export type TabListSongsDetailNavigatorScreenParams = NavigatorScreenParams<TabListSongsDetailParams>;
export type ListSongsDetailScreenRouteProp = RouteProp<TabListSongsDetailParams, 'ListSongs'>;
export type ListSongsDetailNavigationProp = BottomTabNavigationProp<TabListSongsDetailParams, 'ListSongs'>;