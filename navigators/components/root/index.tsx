import * as React from 'react';

import { RootParams, navigationRef } from '@navigators/config/root';

import DrawerHomeNavigator from './home';
import DrawerSettingsNavigator from './settings';
import { NavigationContainer } from '@react-navigation/native';
import { SoundPlayerContext } from '@context-api/index';
import StackSplashNavigator from './splash-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAudioHelper } from '@hooks/index';

const Root = createDrawerNavigator<RootParams>();

function RootNavigator() {
    const player = useAudioHelper({
        listSounds: [],
    });

    return (
        <SoundPlayerContext.Provider value={player}>
            <NavigationContainer ref={navigationRef}>
                <Root.Navigator initialRouteName='Splash'>
                    <Root.Screen
                        name='Splash'
                        component={StackSplashNavigator}
                    />
                    <Root.Screen
                        name='Home'
                        component={DrawerHomeNavigator}
                    />
                    <Root.Screen
                        name='Settings'
                        component={DrawerSettingsNavigator}
                    />
                </Root.Navigator>
            </NavigationContainer>
        </SoundPlayerContext.Provider>
    )
}

export default RootNavigator;