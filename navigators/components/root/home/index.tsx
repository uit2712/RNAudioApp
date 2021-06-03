import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DrawerHomeParams } from '../../../config/root/home';
import TabAlbumsNavigator from './tab-albums';
import TabArtistsNavigators from './tab-artists';
import TabPlaylistsNavigator from './tab-playlists';
import TabSongsNavigators from './tab-songs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SoundPlayerContext } from '../../../../context-api';
import LinearProgress from 'react-native-elements/dist/linearProgress/LinearProgress';

const DrawerHome = createBottomTabNavigator<DrawerHomeParams>();

interface IDrawerHomeNavigatorScreen {
    name: keyof DrawerHomeParams;
    component: React.ComponentType<any>;
    title: string;
    label: ({ title, color }: { title: string, color: string }) => JSX.Element;
    getColor: (isFocused: boolean) => string;
    icon: ({ color, size }: { color: string, size?: number }) => JSX.Element;
}
const screens: IDrawerHomeNavigatorScreen[] = [
    {
        name: 'TabPlaylists',
        component: TabPlaylistsNavigator,
        title: 'Danh sách phát',
        getColor: (isFocused: boolean) => isFocused === true ? '#C70039' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='playlist-music' size={size ?? 35} color={color} />,
    },
    {
        name: 'TabSongs',
        title: 'Bài hát',
        component: TabSongsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#FFC300' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Fontisto name='applemusic' size={size ?? 35} color={color} />,
    },
    {
        name: 'TabArtists',
        title: 'Nghệ sĩ',
        component: TabArtistsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#A569BD' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Ionicons name='md-person-circle-sharp' size={size ?? 35} color={color} />,
    },
    {
        name: 'TabAlbums',
        title: 'Album',
        component: TabAlbumsNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
    }
]

const iconSize = 25;

function DrawerHomeNavigator() {
    return (
        <DrawerHome.Navigator
            initialRouteName='TabSongs'
            tabBar={(props) => <CustomTabBar {...props}/>}
            tabBarOptions={{
                keyboardHidesTabBar: true,
            }}
        >
            {
                screens.map((screen: IDrawerHomeNavigatorScreen, index: number) => (
                    <DrawerHome.Screen
                        key={index}
                        name={screen.name}
                        component={screen.component}
                        options={() => ({
                            tabBarIcon: ({ focused }) => screen.icon({ color: screen.getColor(focused), size: iconSize }),
                            tabBarLabel: ({ focused }) => screen.label({ title: screen.title, color: screen.getColor(focused) }),
                        })}
                    />
                ))
            }
        </DrawerHome.Navigator>
    )
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) {
    return (
        <>
            <MiniPlayer/>
            <View style={{ flexDirection: 'row' }}>
                {state.routes.map((route, index) => {
                    const screen = screens[index];
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {screen.icon({ color: screen.getColor(isFocused) })}
                            {screen.label({ title: screen.title, color: screen.getColor(isFocused) })}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
}

function MiniPlayer() {
    const player = React.useContext(SoundPlayerContext);

    if (!player.currentAudioInfo || !player.currentAudioInfo.name) {
        return null;
    }

    return (
        <>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 60,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity style={{ width: '60%', }}>
                    <Text style={{ color: 'white' }}>{player.currentAudioInfo.name}</Text>
                    <Text style={{ color: 'white' }}>{player.currentAudioInfo.other}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={player.previous}>
                        <AntDesign
                            name='stepbackward'
                            size={30}
                            color='white'
                        />
                    </TouchableOpacity>
                    {
                        player.status === 'play' ? (
                            <TouchableOpacity onPress={player.pause}>
                                <AntDesign
                                    name='pausecircle'
                                    size={30}
                                    color='white'
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={player.play}>
                                <AntDesign
                                    name='play'
                                    size={30}
                                    color='white'
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={player.next}>
                        <AntDesign
                            name='stepforward'
                            size={30}
                            color='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10, }}>
                        <AntDesign
                            name='heart'
                            size={30}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {
                player.duration > 0 && (
                    <LinearProgress
                        value={player.currentTime / player.duration}
                        variant='determinate'
                        trackColor='gray'
                        color='blue'
                    />
                )
            }
        </>
    )
}

export default DrawerHomeNavigator;