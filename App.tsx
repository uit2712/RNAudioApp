/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//https://stackoverflow.com/questions/58505345/create-sticky-component-for-bottom-tab-with-react-navigation
import React from 'react';
import {
    View,
} from 'react-native';
import RootNavigator from './navigators/components/root';

function App() {
    return (
        <RootNavigator/>
    );
};

export default App;
