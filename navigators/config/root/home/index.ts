import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TabAlbumsNavigatorScreenParams } from './tab-albums';
import { TabArtistsNavigatorScreenParams } from './tab-artists';
import { TabSoundPlayerDetailNavigatorScreenParams, } from './tab-detail';
import { TabPlaylistsNavigatorScreenParams } from './tab-playlists';
import { TabSongsNavigatorScreenParams } from './tab-songs';

export type DrawerHomeParams = {
    TabAlbums: TabAlbumsNavigatorScreenParams;
    TabArtists: TabArtistsNavigatorScreenParams;
    TabPlaylists: TabPlaylistsNavigatorScreenParams;
    TabSongs: TabSongsNavigatorScreenParams;
    TabSoundPlayerDetail: TabSoundPlayerDetailNavigatorScreenParams;
}

export type DrawerHomeNavigationProp = BottomTabNavigationProp<DrawerHomeParams>;
export type DrawerHomeScreenParams = NavigatorScreenParams<DrawerHomeParams>;