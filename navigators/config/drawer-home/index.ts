import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TabAlbumsNavigatorScreenParams } from './tab-albums';
import { TabArtistsNavigatorScreenParams } from './tab-artists';
import { TabGenresScreenParams } from './tab-genres';
import { TabListSongsDetailNavigatorScreenParams } from './tab-list-songs-detail';
import { TabOthersNavigatorScreenParams, } from './tab-others';
import { TabPlaylistsNavigatorScreenParams } from './tab-playlists';
import { TabSearchNavigatorScreenParams } from './tab-search';
import { TabSongsAdditionScreenParams } from './tab-songs-addition';
import { TabSongsNavigatorScreenParams } from './tab-songs';

export type DrawerHomeParams = {
    TabAlbums: TabAlbumsNavigatorScreenParams;
    TabArtists: TabArtistsNavigatorScreenParams;
    TabPlaylists: TabPlaylistsNavigatorScreenParams;
    TabSongs: TabSongsNavigatorScreenParams;
    TabOthers: TabOthersNavigatorScreenParams;
    TabSearch: TabSearchNavigatorScreenParams;
    TabListSongs: TabListSongsDetailNavigatorScreenParams;
    TabSongsAddition: TabSongsAdditionScreenParams;
    TabGenres: TabGenresScreenParams;
}

export type DrawerHomeNavigationProp = BottomTabNavigationProp<DrawerHomeParams>;
export type DrawerHomeScreenParams = NavigatorScreenParams<DrawerHomeParams>;