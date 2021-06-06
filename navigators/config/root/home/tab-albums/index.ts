import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '../../../../route-params';

export interface IAlbumsScreenParams extends IScreenParams {
}

export type TabAlbumsParams = {
    Albums: IAlbumsScreenParams;
}

export type TabAlbumsNavigationProp = BottomTabNavigationProp<TabAlbumsParams>;
export type TabAlbumsNavigatorScreenParams = NavigatorScreenParams<TabAlbumsParams>;
export type AlbumsScreenRouteProp = RouteProp<TabAlbumsParams, 'Albums'>;