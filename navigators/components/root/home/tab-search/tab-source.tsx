import * as React from 'react';

import SongsOfflineScreen from '../../../../../screens/SongsOfflineScreen';
import SongsOnlineScreen from '../../../../../screens/SongsOnlineScreen';
import { TabSourceParams } from '../../../../config/root/home/tab-search/tab-source';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TabSource = createMaterialTopTabNavigator<TabSourceParams>();

function TabSourceNavigator() {
    return (
        <TabSource.Navigator>
            <TabSource.Screen
                name='Offline'
                component={SongsOfflineScreen}
                options={{
                    tabBarLabel: () => <Text>Thư viện</Text>
                }}
            />
            <TabSource.Screen
                name='Online'
                component={SongsOnlineScreen}
                options={{
                    tabBarLabel: () => <Text>Trực tuyến</Text>
                }}
            />
        </TabSource.Navigator>
    )
}

export default TabSourceNavigator;