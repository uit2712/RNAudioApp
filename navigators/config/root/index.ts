import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { DrawerHomeParams } from './home';
import { DrawerSettingsParams } from './settings';

export type RootParams = {
    Home: DrawerHomeParams;
    Settings: DrawerSettingsParams;
}

export type RootNavigationProp = BottomTabNavigationProp<RootParams>;
export type RootNavigatorScreenParams = NavigatorScreenParams<RootParams>;