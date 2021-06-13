import { NavigatorScreenParams, RouteProp, } from '@react-navigation/native';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { IScreenParams } from '@navigators/route-params';
import { TabSongsInPlaylistsNavigatorScreenParams } from './tab-songs-in-playlists';

export type TabSongsAdditionParams = {
    SongAddition: TabSongsInPlaylistsNavigatorScreenParams;
}

export type TabSongsAdditionNavigationProp = BottomTabNavigationProp<TabSongsAdditionParams>;
export type TabSongsAdditionScreenParams = NavigatorScreenParams<TabSongsAdditionParams>;
export type AddSongsToCusomPlaylistScreenRouteProp = RouteProp<TabSongsAdditionParams, 'SongAddition'>;