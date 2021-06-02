import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AlbumsScreen from '../../../../../screens/AlbumsScreen';
import { TabAlbumsParams } from '../../../../config/root/home/tab-albums';

const TabAlbums = createStackNavigator<TabAlbumsParams>();

function TabAlbumsNavigator() {
    return (
        <TabAlbums.Navigator>
            <TabAlbums.Screen
                name='Albums'
                component={AlbumsScreen}
            />
        </TabAlbums.Navigator>
    )
}

export default TabAlbumsNavigator;