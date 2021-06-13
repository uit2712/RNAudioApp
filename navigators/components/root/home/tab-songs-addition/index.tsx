import * as React from 'react';

import { TabSongsAdditionParams } from '@navigators/config/root/home/tab-songs-addition';
import TabSongsInPlaylistsNavigator from './tab-songs-in-playlists';
import { createStackNavigator } from '@react-navigation/stack';

const TabSongsAddition = createStackNavigator<TabSongsAdditionParams>();

function TabSongsAdditionNavigator() {
    return (
        <TabSongsAddition.Navigator>
            <TabSongsAddition.Screen
                name='SongAddition'
                component={TabSongsInPlaylistsNavigator}
            />
        </TabSongsAddition.Navigator>
    )
}

export default TabSongsAdditionNavigator;