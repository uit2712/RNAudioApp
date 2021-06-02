
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tab1Params } from '../../../config/drawer1/tab1';
import Tab2Navigator from './tab2';
import Stack2Navigator from './stack2';

const Tab1 = createBottomTabNavigator<Tab1Params>();
function Tab1Navigator() {
    return (
        <Tab1.Navigator>
            <Tab1.Screen
                name='Tab2'
                component={Tab2Navigator}
            />
            <Tab1.Screen
                name='Stack2'
                component={Stack2Navigator}
            />
        </Tab1.Navigator>
    )
}

export default Tab1Navigator;