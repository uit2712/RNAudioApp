import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import SettingsScreen from '../../../../screens/SettingsScreen';
import { DrawerHomeParams } from '../../../config/root/home';
import { DrawerSettingsParams } from '../../../config/root/settings';

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