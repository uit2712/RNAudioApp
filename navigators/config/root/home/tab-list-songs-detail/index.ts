import { NavigatorScreenParams, RouteProp, } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IListSongsDetail } from '@interfaces/index';
import { IScreenParams } from '@navigators/route-params';

export interface IListSongsDetailScreenParams extends IScreenParams {
    info: IListSongsDetail;
    isReverseListSongs?: boolean;
}

export type TabListSongsDetailParams = {
    ListSongs: IListSongsDetailScreenParams;
}

export type TabListSongsDetailNavigationProp = BottomTabNavigationProp<TabListSongsDetailParams>;
export type TabListSongsDetailNavigatorScreenParams = NavigatorScreenParams<TabListSongsDetailParams>;
export type ListSongsDetailScreenRouteProp = RouteProp<TabListSongsDetailParams, 'ListSongs'>;