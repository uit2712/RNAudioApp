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
import { SoundPlayerContext } from '../../../../context-api';
import Slider from '@react-native-community/slider';

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

    if (!player.currentAudioName) {
        return null;
    }

    return (
        <>
            <TouchableOpacity style={{ flexDirection: 'row', height: 50, }}>
                <TouchableOpacity style={{ width: '70%' }}>
                    <Text>{player.currentAudioName}</Text>
                </TouchableOpacity>
                <TouchableOpacity>

                </TouchableOpacity>
            </TouchableOpacity>
            <Slider
                style={{ width: '100%', height: 10 }}
                minimumValue={0}
                maximumValue={player.duration}
                value={player.currentTime}
                minimumTrackTintColor="violet"
                maximumTrackTintColor="gray"
                thumbTintColor='white'
                // thumbTintColor='#FFFFFF'
                // onSlidingComplete={(volume) => player.setVolume(volume)}
            />
            {/* <Slider
                style={{ width: '100%', height: 5 }}
                minimumValue={0}
                maximumValue={player.duration}
                value={player.currentTime}
                minimumTrackTintColor="violet"
                maximumTrackTintColor="gray"
                thumbTintColor='violet'
                thumbStyle={{ height: 0 }}
                allowTouchTrack={false}
            /> */}
        </>
    )
}

export default DrawerHomeNavigator;