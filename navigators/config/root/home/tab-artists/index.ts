import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { IScreenParams } from '../../../../route-params';

export interface IArtistsScreenParams extends IScreenParams {
}

export type TabArtistsParams = {
    Artists: IArtistsScreenParams;
}

export type TabArtistsNavigationProp = BottomTabNavigationProp<TabArtistsParams>;
export type TabArtistsNavigatorScreenParams = NavigatorScreenParams<TabArtistsParams>;
export type ArtistsScreenRouteProp = RouteProp<TabArtistsParams, 'Artists'>;