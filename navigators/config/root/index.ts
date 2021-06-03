import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationContainerRef, NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { DrawerHomeScreenParams } from './home';
import { DrawerSettingsScreenParams } from './settings';

export type RootParams = {
    Home: DrawerHomeScreenParams;
    Settings: DrawerSettingsScreenParams;
}

export type RootNavigationProp = BottomTabNavigationProp<RootParams>;
export type RootNavigatorScreenParams = NavigatorScreenParams<RootParams>;

export const navigationRef = React.createRef<NavigationContainerRef>();
export function navigate(args_0: keyof RootParams, args_1: DrawerHomeScreenParams | DrawerSettingsScreenParams) {
    navigationRef.current?.navigate(args_0, args_1);
}