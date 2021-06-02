import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Stack2NavigatorScreenParams } from './stack2';
import { Tab2NavigatorScreenParams } from './tab2';

export type Tab1Params = {
    Stack2: Stack2NavigatorScreenParams;
    Tab2: Tab2NavigatorScreenParams;
}

export type Tab1NavigationProp = BottomTabNavigationProp<Tab1Params>;
export type Tab1NavigationScreenParams = NavigatorScreenParams<Tab1Params>;