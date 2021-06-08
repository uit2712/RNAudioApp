import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IScreenParams } from '@navigators/route-params';
import { NavigatorScreenParams } from '@react-navigation/native';

export interface ISplashScreenParams extends IScreenParams {
}

export type StackSplashParams = {
    Splash: ISplashScreenParams;
}

export type StackSplashNavigationProp = DrawerNavigationProp<StackSplashParams>;
export type StackSplashScreenParams = NavigatorScreenParams<StackSplashParams>;