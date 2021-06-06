import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TabAlbumsNavigatorScreenParams } from './tab-albums';
import { TabArtistsNavigatorScreenParams } from './tab-artists';
import { TabPlaylistsNavigatorScreenParams } from './tab-playlists';
import { TabSearchNavigatorScreenParams } from './tab-search';
import { TabSongsNavigatorScreenParams } from './tab-songs';
import { TabSoundPlayerDetailNavigatorScreenParams, } from './tab-detail';

export type DrawerHomeParams = {
    TabAlbums: TabAlbumsNavigatorScreenParams;
    TabArtists: TabArtistsNavigatorScreenParams;
    TabPlaylists: TabPlaylistsNavigatorScreenParams;
    TabSongs: TabSongsNavigatorScreenParams;
    TabSoundPlayerDetail: TabSoundPlayerDetailNavigatorScreenParams;
    TabSearch: TabSearchNavigatorScreenParams;
}

export type DrawerHomeNavigationProp = BottomTabNavigationProp<DrawerHomeParams>;
export type DrawerHomeScreenParams = NavigatorScreenParams<DrawerHomeParams>;