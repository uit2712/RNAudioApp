import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '@navigators/route-params';

export interface ISongsScreenParams extends IScreenParams {
}

export interface IUpdatingSongScreenParams extends IScreenParams {
}

export type TabSongsParams = {
    Songs?: ISongsScreenParams;
    UpdatingSong?: IUpdatingSongScreenParams;
}

export type TabSongsNavigationProp = BottomTabNavigationProp<TabSongsParams>;
export type TabSongsNavigatorScreenParams = NavigatorScreenParams<TabSongsParams>;
export type SongsScreenRouteProp = RouteProp<TabSongsParams, 'Songs'>;