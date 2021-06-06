import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { SoundPlayerContext } from '../../../context-api';
import { useAudioHelper } from '../../../hooks';
import { navigationRef, RootParams } from '../../config/root';
import DrawerHomeNavigator from './home';
import DrawerSettingsNavigator from './settings';

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