import * as React from 'react';

import SplashScreen from '../../../../screens/SplashScreen';
import { StackSplashParams } from '@navigators/config/root/splash-screen';
import { createStackNavigator } from '@react-navigation/stack';

const StackSplash = createStackNavigator<StackSplashParams>()

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