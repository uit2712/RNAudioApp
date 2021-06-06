import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabSourceParams } from '../../../../config/root/home/tab-search/tab-source';
import SongsOfflineScreen from '../../../../../screens/SongsOfflineScreen';
import SongsOnlineScreen from '../../../../../screens/SongsOnlineScreen';

const TabSource = createMaterialTopTabNavigator<TabSourceParams>();

function TabSourceNavigator() {
    return (
        <TabSource.Navigator>
            <TabSource.Screen
                name='Offline'
                component={SongsOfflineScreen}
                options={{
                    title: 'Thư viện'
                }}
            />
            <TabSource.Screen
                name='Online'
                component={SongsOnlineScreen}
                options={{
                    title: 'Trực tuyến'
                }}
            />
        </TabSource.Navigator>
    )
}

export default TabSourceNavigator;