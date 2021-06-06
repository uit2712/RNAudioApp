import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '../../../../route-params';

export interface ISoundPlayerDetailScreenParams extends IScreenParams {
}

export type TabSoundPlayerDetailParams = {
    SoundPlayerDetail: ISoundPlayerDetailScreenParams;
}

export type TabSoundPlayerDetailNavigationProp = BottomTabNavigationProp<TabSoundPlayerDetailParams>;
export type TabSoundPlayerDetailNavigatorScreenParams = NavigatorScreenParams<TabSoundPlayerDetailParams>;
export type TabSoundPlayerDetailScreenRouteProp = RouteProp<TabSoundPlayerDetailParams, 'SoundPlayerDetail'>;