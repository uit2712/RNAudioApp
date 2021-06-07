import * as React from 'react';

import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';

import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { RootNavigationProp } from '../navigators/config/root';
import { StyleSheet, } from 'react-native';
import { useGetAllData } from '../hooks';
import { useNavigation } from '@react-navigation/core';
import { useTranslatedAppName } from '../hooks/splash-screen-hooks';

function SplashScreen() {
    const appNameSize = {
        width: ScreenWidth * 0.7,
        height: 144 * ScreenWidth * 0.7 / 800,
    }
    const { animatedAppNameStyle, isAnimatedFinished } = useTranslatedAppName({
        toValue: (ScreenHeight - appNameSize.height) / 2,
        duration: 1000,
    });
    
    const navigation = useNavigation<RootNavigationProp>();
    const { isGetAllDataFinished } = useGetAllData();
    React.useEffect(() => {
        if (isAnimatedFinished && isGetAllDataFinished) {
            navigation.navigate('Home', {
                screen: 'TabSongs',
                params: {
                    screen: 'Songs',
                    params: {},
                }
            });
        }
    }, [isAnimatedFinished, isGetAllDataFinished]);

    return (
        <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            locations={[0,0.5,0.6]}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.linearGradient}
        >
            <Animated.Image
                source={require('../images/app-name.png')}
                style={[{
                    width: appNameSize.width,
                    height: appNameSize.height
                }, animatedAppNameStyle]}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 30,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default SplashScreen;