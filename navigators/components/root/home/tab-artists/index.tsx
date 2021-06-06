import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeHeader from '../../../../../common/components/HomeHeader';
import ArtistsScreen from '../../../../../screens/ArtistsScreen';
import { TabArtistsParams } from '../../../../config/root/home/tab-artists';

const TabArtists = createStackNavigator<TabArtistsParams>();

function TabArtistsNavigators() {
    return (
        <TabArtists.Navigator
            screenOptions={{
                header: () => <HomeHeader/>
            }}
        >
            <TabArtists.Screen
                name='Artists'
                component={ArtistsScreen}
                options={{
                    title: 'Nghệ sĩ'
                }}
            />
        </TabArtists.Navigator>
    )
}

export default TabArtistsNavigators;