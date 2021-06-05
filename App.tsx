/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://stackoverflow.com/questions/58505345/create-sticky-component-for-bottom-tab-with-react-navigation
import React from 'react';
import { SoundPlayerContext } from './context-api';
import { useAudioHelper, useGetAllMusicFiles } from './hooks';
import RootNavigator from './navigators/components/root';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as ReduxProvider } from 'react-redux';
import store from './store';

function App() {
    const { listTracks } = useGetAllMusicFiles();
    const player = useAudioHelper({
        listSounds: listTracks,
        isAutoplayOnLoad: false,
        isLogStatus: true,
    });

    return (
        <ReduxProvider store={store}>
            <MenuProvider>
                <SoundPlayerContext.Provider value={player}>
                    <RootNavigator/>
                </SoundPlayerContext.Provider>
            </MenuProvider>
        </ReduxProvider>
    );
};

export default App;
