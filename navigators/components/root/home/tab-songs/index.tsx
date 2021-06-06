import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeHeader from '../../../../../common/components/HomeHeader';
import SongsScreen from '../../../../../screens/SongsScreen';
import { TabSongsParams } from '../../../../config/root/home/tab-songs';

const TabSongs = createStackNavigator<TabSongsParams>();

function TabSongsNavigators() {
    return (
        <TabSongs.Navigator
            screenOptions={{
                header: () => <HomeHeader/>
            }}
        >
            <TabSongs.Screen
                name='Songs'
                component={SongsScreen}
                options={{
                    title: '',
                    // headerTransparent: true,
                }}
            />
        </TabSongs.Navigator>
    )
}

export default TabSongsNavigators;