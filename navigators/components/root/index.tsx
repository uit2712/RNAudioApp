import * as React from 'react';

import { RootParams, navigationRef } from '../../config/root';

import DrawerHomeNavigator from './home';
import DrawerSettingsNavigator from './settings';
import { NavigationContainer } from '@react-navigation/native';
import { SoundPlayerContext } from '../../../context-api';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAudioHelper } from '../../../hooks';

const Root = createDrawerNavigator<RootParams>();

function RootNavigator() {
    const player = useAudioHelper({
        listSounds: [],
    });

    return (
        <SoundPlayerContext.Provider value={player}>
            <NavigationContainer ref={navigationRef}>
                <Root.Navigator>
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