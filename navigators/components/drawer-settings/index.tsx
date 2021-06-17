import * as React from 'react';

import { DrawerSettingsParams } from '@navigators/config/drawer-settings';
import SettingsScreen from '@screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const DrawerSettings = createBottomTabNavigator<DrawerSettingsParams>()

function DrawerSettingsNavigator() {
    return (
        <DrawerSettings.Navigator>
            <DrawerSettings.Screen
                name='Settings'
                component={SettingsScreen}
            />
        </DrawerSettings.Navigator>
    )
}

export default DrawerSettingsNavigator;