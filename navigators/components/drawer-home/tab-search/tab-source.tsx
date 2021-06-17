import * as React from 'react';

import { DrawerHomeContext } from '@context-api/index';
import SongsOfflineScreen from '@screens/SongsOfflineScreen';
import SongsOnlineScreen from '@screens/SongsOnlineScreen';
import { TabSourceParams } from '@navigators/config/drawer-home/tab-search/tab-source';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useHomeBottomTabHelper } from '@hooks/index';

const TabSource = createMaterialTopTabNavigator<TabSourceParams>();

function TabSourceNavigator() {
    const { setIsShowTabBar, } = React.useContext(DrawerHomeContext);
    useHomeBottomTabHelper({
        onBack: () => setIsShowTabBar(true),
        onFocus: () => setIsShowTabBar(false)
    });

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