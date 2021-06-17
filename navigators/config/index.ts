import { NavigationContainerRef, NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { DrawerHomeScreenParams } from './drawer-home';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerSettingsScreenParams } from './drawer-settings';
import { DrawerSplashScreenParams } from './drawer-splash-screen';
import React from 'react';

export type RootParams = {
    Home: DrawerHomeScreenParams;
    Settings: DrawerSettingsScreenParams;
    Splash: DrawerSplashScreenParams;
}

export type RootNavigationProp = DrawerNavigationProp<RootParams>;
export type RootNavigatorScreenParams = NavigatorScreenParams<RootParams>;
export type DrawerHomeRouteProp = RouteProp<RootParams, 'Home'>;

export const navigationRef = React.createRef<NavigationContainerRef>();
export function navigate(args_0: keyof RootParams, args_1: DrawerHomeScreenParams | DrawerSettingsScreenParams) {
    navigationRef.current?.navigate(args_0, args_1);
}