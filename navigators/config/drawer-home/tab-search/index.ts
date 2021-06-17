import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, } from '@react-navigation/native';
import { TabSourceNavigatorScreenParams } from './tab-source';

export type TabSearchParams = {
    Search: TabSourceNavigatorScreenParams;
}

export type TabSearchNavigationProp = BottomTabNavigationProp<TabSearchParams>;
export type TabSearchNavigatorScreenParams = NavigatorScreenParams<TabSearchParams>;