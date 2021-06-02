import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { DrawerHomeParams } from '../../../config/root/home';
import TabAlbumsNavigator from './tab-albums';
import TabArtistsNavigators from './tab-artists';
import TabPlaylistsNavigator from './tab-playlists';
import TabSongsNavigators from './tab-songs';

const DrawerHome = createBottomTabNavigator<DrawerHomeParams>()

function DrawerHomeNavigator() {
    return (
        <DrawerHome.Navigator>
            <DrawerHome.Screen
                name='TabPlaylists'
                component={TabPlaylistsNavigator}
            />
            <DrawerHome.Screen
                name='TabSongs'
                component={TabSongsNavigators}
            />
            <DrawerHome.Screen
                name='TabArtists'
                component={TabArtistsNavigators}
            />
            <DrawerHome.Screen
                name='TabAlbums'
                component={TabAlbumsNavigator}
            />
        </DrawerHome.Navigator>
    )
}

export default DrawerHomeNavigator;