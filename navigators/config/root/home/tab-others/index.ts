import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IScreenParams } from '@navigators/route-params';
import { SoundFileType } from 'types/songs-screen-types';

export interface ISoundPlayerDetailScreenParams extends IScreenParams {
}

export interface IAddSongToPlaylistScreenParams extends IScreenParams {
    sound: SoundFileType;
}

export type TabOthersParams = {
    SoundPlayerDetail?: ISoundPlayerDetailScreenParams;
    AddSongToPlaylist: IAddSongToPlaylistScreenParams;
}

export type TabOthersNavigationProp = BottomTabNavigationProp<TabOthersParams>;
export type TabOthersNavigatorScreenParams = NavigatorScreenParams<TabOthersParams>;
export type TabOthersScreenRouteProp = RouteProp<TabOthersParams, 'SoundPlayerDetail'>;