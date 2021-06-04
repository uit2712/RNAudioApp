import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ArtistsScreen from '../../../../../screens/ArtistsScreen';
import { TabArtistsParams } from '../../../../config/root/home/tab-artists';

const TabArtists = createStackNavigator<TabArtistsParams>();

function TabArtistsNavigators() {
    return (
        <TabArtists.Navigator>
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