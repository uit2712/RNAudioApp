import * as React from 'react';

import AllSongsInPlaylistsScreen from '@screens/AllSongsInPlaylistsScreen';
import LastPlayedSongsInPlaylistsScreen from '@screens/LastPlayedSongsInPlaylistsScreen';
import MostPlayedSongsInPlaylistsScreen from '@screens/MostPlayedSongsInPlaylistsScreen';
import { TabSongsInPlaylistsParams } from '@navigators/config/root/home/tab-songs-addition/tab-songs-in-playlists';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TabSongsInPlaylists = createMaterialTopTabNavigator<TabSongsInPlaylistsParams>();
function TabSongsInPlaylistsNavigator() {
    return (
        <TabSongsInPlaylists.Navigator>
            <TabSongsInPlaylists.Screen
                name='All'
                component={AllSongsInPlaylistsScreen}
                options={{
                    tabBarLabel: () => <Text>Tất cả</Text>
                }}
            />
            <TabSongsInPlaylists.Screen
                name='MostPlayed'
                component={MostPlayedSongsInPlaylistsScreen}
                options={{
                    tabBarLabel: () => <Text>Phát nhiều nhất</Text>
                }}
            />
            <TabSongsInPlaylists.Screen
                name='LastPlayed'
                component={LastPlayedSongsInPlaylistsScreen}
                options={{
                    tabBarLabel: () => <Text>Phát lần cuối</Text>
                }}
            />
        </TabSongsInPlaylists.Navigator>
    )
}

export default TabSongsInPlaylistsNavigator;