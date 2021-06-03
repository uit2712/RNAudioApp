import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { DrawerHomeContext, } from '../context-api';

function SoundPlayerScreen() {
    const navigation = useNavigation();
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', onFocus);
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    function onFocus() {
        setIsShowTabBar(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setIsShowTabBar(true);
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <View>
            <Text>Sound player screen</Text>
        </View>
    )
}

export default SoundPlayerScreen;