import * as React from 'react';

import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationState, NavigationContainer, ParamListBase, } from '@react-navigation/native';
import { IDrawerNavigatorScreen, IPlayer, } from '@interfaces/index';
import { Image, Text, } from 'react-native';
import MusicControl, { Command } from 'react-native-music-control';
import { RootParams, navigationRef } from '@navigators/config';
import { useAudioHelper, useMusicControl, } from '@hooks/index';

import DrawerHomeNavigator from './drawer-home';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import DrawerSettingsNavigator from './drawer-settings';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { SoundPlayerContext, } from '@context-api/index';
import StackSplashNavigator from './drawer-splash-screen';

const Root = createDrawerNavigator<RootParams>();

const screens: IDrawerNavigatorScreen<RootParams>[] = [
    {
        name: 'Home',
        component: DrawerHomeNavigator,
        title: 'Home',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Entypo name='home' size={size ?? 35} color={color} />,
        isVisible: true,
        activeBackgroundColor: 'rgb(255, 51, 204)',
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'black',
    },
    {
        name: 'Settings',
        component: DrawerSettingsNavigator,
        title: 'Cài đặt',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Fontisto name='player-settings' size={size ?? 35} color={color} />,
        isVisible: true,
        activeBackgroundColor: 'rgb(255, 102, 0)',
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'black',
    },
    {
        name: 'Splash',
        component: StackSplashNavigator,
        title: 'Splash screen',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcons name='playlist-music' size={size ?? 35} color={color} />,
        isVisible: false,
    },
]

function RootNavigator() {
    const player = useAudioHelper({
        listSounds: [],
    });
    useMusicControl(player);

    return (
        <SoundPlayerContext.Provider value={player}>
            <NavigationContainer ref={navigationRef}>
                <Root.Navigator
                    initialRouteName='Splash'
                    drawerContent={(props) => <CustomDrawer {...props}/>}
                >
                    {
                        screens.map((screen: IDrawerNavigatorScreen<RootParams>, index: number) => (
                            <Root.Screen
                                key={index}
                                name={screen.name}
                                component={screen.component}
                            />
                        ))
                    }
                </Root.Navigator>
            </NavigationContainer>
            <UpdatingMusicControl/>
        </SoundPlayerContext.Provider>
    )
}

class UpdatingMusicControl extends React.Component {
    static context = SoundPlayerContext;

    componentDidMount() {
        const context = this.context as IPlayer;
        MusicControl.enableBackgroundMode(true);

        MusicControl.on(Command.play, context.play);
        MusicControl.on(Command.pause, context.pause);
        MusicControl.on(Command.stop, context.stop);
        MusicControl.on(Command.nextTrack, context.next);
        MusicControl.on(Command.previousTrack, context.previous);
        MusicControl.on(Command.seek, context.seekToTime);
    }

    render() {
        return null
    }
}

function CustomDrawer(props: DrawerContentComponentProps<DrawerContentOptions>) {
    return (
        <>
            <CustomDrawerHeader/>
            <CustomDrawerContent {...props}/>
        </>
    );
}

function CustomDrawerHeader() {
    const appNameSize = {
        width: ScreenWidth * 0.5,
        height: 144 * ScreenWidth * 0.5 / 800,
    }

    return (
        <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            locations={[0,0.5,0.6]}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={require('../../images/app-name.png')}
                style={{
                    width: appNameSize.width,
                    height: appNameSize.height
                }}
            />
        </LinearGradient>
    )
}

function CustomDrawerContent({ state, navigation }: DrawerContentComponentProps<DrawerContentOptions>) {
    return (
        <DrawerContentScrollView>
            {
                state.routes.map((route, index) => {
                    const props = {
                        key: index,
                        screen: screens[index],
                        index,
                        navigation,
                        state,
                    };

                    return (
                        <CustomDrawerContentItem {...props}/>
                    )
                })
            }
        </DrawerContentScrollView>
    )
}

const iconSize = 25;
function CustomDrawerContentItem({
    screen,
    index,
    navigation,
    state,
}: {
    screen: IDrawerNavigatorScreen<RootParams>,
    index: number,
    navigation: DrawerNavigationHelpers,
    state: DrawerNavigationState<ParamListBase>,
}) {
    const isFocused = state.index === index;

    return (
        <>
            {
                screen.isVisible && (
                    <DrawerItem
                        label={screen.title}
                        onPress={() => navigation.navigate(screen.name)}
                        icon={() => <screen.icon color={isFocused ? screen.activeTintColor : screen.inactiveTintColor} size={iconSize}/>}
                        style={{
                            backgroundColor: isFocused === true ? screen.activeBackgroundColor : screen.inactiveBackgroundColor,
                        }}
                        labelStyle={{
                            color: isFocused === true ? screen.activeTintColor : screen.inactiveTintColor,
                        }}
                    />
                )
            }
        </>
    )
}

export default RootNavigator;