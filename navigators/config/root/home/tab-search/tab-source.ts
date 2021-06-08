import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '@navigators/route-params';
import { NavigatorScreenParams, } from '@react-navigation/native';

export interface ISongsOfflineScreenParams extends IScreenParams {
}

export interface ISongsOnlineScreenParams extends IScreenParams {
}

export type TabSourceParams = {
    Offline: ISongsOfflineScreenParams;
    Online: ISongsOnlineScreenParams;
}

export type TabSourceNavigationProp = BottomTabNavigationProp<TabSourceParams>;
export type TabSourceNavigatorScreenParams = NavigatorScreenParams<TabSourceParams>;