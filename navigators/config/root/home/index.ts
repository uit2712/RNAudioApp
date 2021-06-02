import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { TabAlbumsNavigatorScreenParams } from './tab-albums';
import { TabArtistsNavigatorScreenParams } from './tab-artists';
import { TabPlaylistsNavigatorScreenParams } from './tab-playlists';
import { TabSongsNavigatorScreenParams } from './tab-songs';

export type DrawerHomeParams = {
    TabAlbums: TabAlbumsNavigatorScreenParams;
    TabArtists: TabArtistsNavigatorScreenParams;
    TabPlaylists: TabPlaylistsNavigatorScreenParams;
    TabSongs: TabSongsNavigatorScreenParams;
}

export type DrawerHomeNavigationProp = BottomTabNavigationProp<DrawerHomeParams>;