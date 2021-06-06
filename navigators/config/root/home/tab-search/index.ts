import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, } from '@react-navigation/native';
import { IScreenParams } from '../../../../route-params';

export interface ISearchScreenParams extends IScreenParams {
}

export type TabSearchParams = {
    Search: ISearchScreenParams;
}

export type TabSearchNavigationProp = BottomTabNavigationProp<TabSearchParams>;
export type TabSearchNavigatorScreenParams = NavigatorScreenParams<TabSearchParams>;