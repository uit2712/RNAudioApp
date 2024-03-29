import * as React from 'react';

import { BottomTabBarOptions, BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { DrawerHomeContext, SoundPlayerContext, } from '@context-api/index';
import { ICurrentTimeProps, IPlayer, IStackNavigatorScreen } from '@interfaces/index';
import { NavigationHelpers, ParamListBase, RouteProp, TabNavigationState } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerHomeParams } from '@navigators/config/drawer-home';
import Favorite from '@components/shared/Favorite';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearProgress from 'react-native-elements/dist/linearProgress/LinearProgress';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabAlbumsNavigator from './tab-albums';
import TabArtistsNavigators from './tab-artists';
import TabGenresNavigator from './tab-genres';
import TabListSongsNavigator from './tab-list-songs-detail';
import TabOthersNavigator from './tab-others';
import TabPlaylistsNavigator from './tab-playlists';
import TabSearchNavigator from './tab-search';
import TabSongsAdditionNavigator from './tab-songs-addition';
import TabSongsNavigators from './tab-songs';
import UpdatingModal from '@components/shared/UpdatingModal';
import { navigate } from '@navigators/config';
import { useDrawHomeSettings } from '@hooks/index';
import { withCurrentTime } from '@hocs/shared/withCurrentTime';

const DrawerHome = createBottomTabNavigator<DrawerHomeParams>();

const screens: IStackNavigatorScreen<DrawerHomeParams>[] = [
    {
        name: 'TabPlaylists',
        component: TabPlaylistsNavigator,
        title: 'Danh sách phát',
        getColor: (isFocused: boolean) => isFocused === true ? '#C70039' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='playlist-music' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'TabSongs',
        title: 'Bài hát',
        component: TabSongsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#FFC300' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Fontisto name='applemusic' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'TabArtists',
        title: 'Nghệ sĩ',
        component: TabArtistsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#A569BD' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Ionicons name='md-person-circle-sharp' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'TabAlbums',
        title: 'Album',
        component: TabAlbumsNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'TabGenres',
        title: 'Thể loại',
        component: TabGenresNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#FF5733' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='guitar-acoustic' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'TabOthers',
        title: 'Trình chơi nhạc',
        component: TabOthersNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
        isVisible: false,
    },
    {
        name: 'TabSearch',
        title: 'Tìm kiếm',
        component: TabSearchNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
        isVisible: false,
    },
    {
        name: 'TabListSongs',
        title: 'Danh sách bài hát',
        component: TabListSongsNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
        isVisible: false,
    },
    {
        name: 'TabSongsAddition',
        title: 'Thêm bài hát',
        component: TabSongsAdditionNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color} />,
        isVisible: false,
    }
]

const iconSize = 25;

function DrawerHomeNavigator() {
    const settings = useDrawHomeSettings();

    return (
        <DrawerHomeContext.Provider value={settings}>
            <UpdatingModal/>
            <DrawerHome.Navigator
                initialRouteName='TabPlaylists'
                tabBar={(props) => <CustomTabBar {...props}/>}
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                }}
            >
                {
                    screens.map((screen: IStackNavigatorScreen<DrawerHomeParams>, index: number) => (
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
        </DrawerHomeContext.Provider>
    )
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) {
    return (
        <>
            <MiniPlayer/>
            <ListTabs
                state={state}
                descriptors={descriptors}
                navigation={navigation}
            />
        </>
    );
}

function ListTabs({ state, descriptors, navigation }: BottomTabBarProps<BottomTabBarOptions>) {
    return (
        <DrawerHomeContext.Consumer>
        {
            ({ isShowTabBar }) => isShowTabBar === true && (
                <View style={{ flexDirection: 'row' }}>
                    {
                        state.routes.map((route, index) => {
                            const props = {
                                key: index,
                                index,
                                route,
                                navigation,
                                screen: screens[index],
                                descriptors,
                                state,
                            };
                            return (
                                <ListTabItem {...props} />
                            )
                        })
                    }
                </View>
            )
        }
        </DrawerHomeContext.Consumer>
    )
}

function ListTabItem({
    screen,
    index,
    navigation,
    route,
    descriptors,
    state,
}: {
    screen: IStackNavigatorScreen<DrawerHomeParams>,
    index: number,
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
    route: RouteProp<ParamListBase, string>,
    descriptors: BottomTabDescriptorMap,
    state: TabNavigationState<ParamListBase>,
}) {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    function onPress() {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    function onLongPress() {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    if (screen.isVisible === false) {
        return <TouchableOpacity key={index}></TouchableOpacity>
    }

    return (
        <TouchableOpacity
            key={index}
            accessibilityRole='button'
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
}

function MiniPlayer() {
    const player = React.useContext(SoundPlayerContext);
    const { isShowMiniPlayer, setIsShowMiniPlayer, setIsShowTabBar } = React.useContext(DrawerHomeContext);

    function goToSoundPlayerDetail() {
        setIsShowTabBar(false);
        setIsShowMiniPlayer(false);
        
        navigate('Home', {
            screen: 'TabOthers',
            params: {
                screen: 'SoundPlayerDetail',
                params: {
                }
            }
        })
    }

    if (isShowMiniPlayer === false || !player.currentAudioInfo || !player.currentAudioInfo.name) {
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
                onPress={goToSoundPlayerDetail}
            >
                <MiniPlayerSummaryInfo goToSoundPlayerDetail={goToSoundPlayerDetail}/>
                <MiniPlayerActions/>
            </TouchableOpacity>
            <MiniPlayerDurationHOC/>
        </>
    )
}

function MiniPlayerSummaryInfo({
    goToSoundPlayerDetail
}: {
    goToSoundPlayerDetail: () => void
}) {
    const player = React.useContext(SoundPlayerContext);
    
    return (
        <TouchableOpacity style={{ width: '60%', }} onPress={goToSoundPlayerDetail}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{player.currentAudioInfo.name}</Text>
            <Text style={{ color: 'white' }}>{player.currentAudioInfo.other}</Text>
        </TouchableOpacity>
    )
}

function MiniPlayerActions() {
    const player = React.useContext(SoundPlayerContext);

    return (
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
            <Favorite
                activeColor='red'
                inactiveColor='white'
                customStyle={{ marginLeft: 10, }}
            />
        </View>
    )
}

class MiniPlayerDuration extends React.Component<ICurrentTimeProps> {
    render() {
        const {
            currentTime,
            player: {
                currentAudioInfo: {
                    duration,
                },
            }
        } = this.props;

        return (
            <>
                {
                    duration > 0 && (
                        <LinearProgress
                            value={currentTime / duration}
                            variant='determinate'
                            trackColor='gray'
                            color='blue'
                        />
                    )
                }
            </>
        )
    }
}
const MiniPlayerDurationHOC = withCurrentTime(MiniPlayerDuration);

export default DrawerHomeNavigator;