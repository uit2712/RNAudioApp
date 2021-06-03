import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { IScreenParams } from '../../../../route-params';

export interface ISongsScreenParams extends IScreenParams {
}

export interface ISongDetailScreenParams extends IScreenParams {
}

export type TabSongsParams = {
    Songs: ISongsScreenParams;
    SongDetail: ISongDetailScreenParams;
}

export type TabSongsNavigationProp = BottomTabNavigationProp<TabSongsParams>;
export type TabSongsNavigatorScreenParams = NavigatorScreenParams<TabSongsParams>;
export type SongsScreenRouteProp = RouteProp<TabSongsParams, 'Songs'>;