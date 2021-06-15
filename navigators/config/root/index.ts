import { NavigationContainerRef, NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { DrawerGenresScreenParams } from './genres';
import { DrawerHomeScreenParams } from './home';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerSettingsScreenParams } from './settings';
import React from 'react';
import { StackSplashScreenParams } from './splash-screen';

export type RootParams = {
    Home: DrawerHomeScreenParams;
    Settings: DrawerSettingsScreenParams;
    Splash: StackSplashScreenParams;
    Genres: DrawerGenresScreenParams;
}

export type RootNavigationProp = DrawerNavigationProp<RootParams>;
export type RootNavigatorScreenParams = NavigatorScreenParams<RootParams>;
export type DrawerHomeRouteProp = RouteProp<RootParams, 'Home'>;

export const navigationRef = React.createRef<NavigationContainerRef>();
export function navigate(args_0: keyof RootParams, args_1: DrawerHomeScreenParams | DrawerSettingsScreenParams) {
    navigationRef.current?.navigate(args_0, args_1);
}