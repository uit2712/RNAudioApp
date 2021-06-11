import { persistor, store, } from '@store/index';

import { MenuProvider } from 'react-native-popup-menu';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import RootNavigator from '@navigators/components/root';

function App() {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MenuProvider>
                    <RootNavigator/>
                </MenuProvider>
            </PersistGate>
        </ReduxProvider>
    );
};

export default App;
