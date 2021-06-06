import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeHeader from '../../../../../common/components/HomeHeader';
import PlaylistsScreen from '../../../../../screens/PlaylistsScreen';
import { TabPlaylistsParams } from '../../../../config/root/home/tab-playlists';

const TabPlaylists = createStackNavigator<TabPlaylistsParams>();

function TabPlaylistsNavigator() {
    return (
        <TabPlaylists.Navigator
            screenOptions={{
                header: () => <HomeHeader/>
            }}
        >
            <TabPlaylists.Screen
                name='Playlists'
                component={PlaylistsScreen}
                options={{
                    headerShown: false,
                }}
            />
        </TabPlaylists.Navigator>
    )
}

export default TabPlaylistsNavigator;