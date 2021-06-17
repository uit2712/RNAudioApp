import * as React from 'react';

import { DrawerSplashParams } from '@navigators/config/drawer-splash-screen';
import SplashScreen from '@screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

const StackSplash = createStackNavigator<DrawerSplashParams>()

function StackSplashNavigator() {
    return (
        <StackSplash.Navigator screenOptions={{ headerShown: false, }}>
            <StackSplash.Screen
                name='Splash'
                component={SplashScreen}
            />
        </StackSplash.Navigator>
    )
}

export default StackSplashNavigator;