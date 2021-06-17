import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IScreenParams } from '@navigators/route-params';
import { NavigatorScreenParams } from '@react-navigation/native';

export interface ISplashScreenParams extends IScreenParams {
}

export type DrawerSplashParams = {
    Splash: ISplashScreenParams;
}

export type DrawerSplashNavigationProp = DrawerNavigationProp<DrawerSplashParams>;
export type DrawerSplashScreenParams = NavigatorScreenParams<DrawerSplashParams>;