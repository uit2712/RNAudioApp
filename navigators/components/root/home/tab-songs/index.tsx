import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SongsScreen from '../../../../../screens/SongsScreen';
import SoundPlayerScreen from '../../../../../screens/SoundPlayerScreen';
import { TabSongsParams } from '../../../../config/root/home/tab-songs';

const TabSongs = createStackNavigator<TabSongsParams>();

function TabSongsNavigators() {
    return (
        <TabSongs.Navigator>
            <TabSongs.Screen
                name='Songs'
                component={SongsScreen}
            />
            <TabSongs.Screen
                name='SongDetail'
                component={SoundPlayerScreen}
            />
        </TabSongs.Navigator>
    )
}

export default TabSongsNavigators;