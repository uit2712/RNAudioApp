import * as React from 'react';

import { FAB, Tab, Text } from 'react-native-elements';
import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationHelpers, ParamListBase, RouteProp, TabNavigationState } from '@react-navigation/native';
import { useGetListSelectedSongsSelector, useGetPlaylistSongsShouldBeAddedSelector } from '@store/selectors/tab-songs-addition-selectors';

import AllSongsInPlaylistsScreen from '@screens/AllSongsInPlaylistsScreen';
import { IStackNavigatorScreen } from '@interfaces/index';
import LastPlayedSongsInPlaylistsScreen from '@screens/LastPlayedSongsInPlaylistsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import MostPlayedSongsInPlaylistsScreen from '@screens/MostPlayedSongsInPlaylistsScreen';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { TabSongsInPlaylistsParams } from '@navigators/config/root/home/tab-songs-addition/tab-songs-in-playlists';
import { TouchableOpacity } from 'react-native';
import { addListSelectedSongsToPlaylistAction } from '@store/actions/tab-songs-addition-actions';
import { useDispatch } from 'react-redux';

const TabSongsInPlaylists = createMaterialTopTabNavigator<TabSongsInPlaylistsParams>();

const theme = {
    activeTintColor: 'orange',
    inactiveTintColor: 'gray',
    labelFontSize: 15,
    iconSize: 35,
}
const screens: IStackNavigatorScreen<TabSongsInPlaylistsParams>[] = [
    {
        name: 'All',
        component: AllSongsInPlaylistsScreen,
        title: 'Tất cả',
        getColor: (isFocused: boolean) => isFocused === true ? theme.activeTintColor : theme.inactiveTintColor,
        label: ({ title, color }) => <Text style={{ color, fontSize: theme.labelFontSize, }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcons name='playlist-music' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'LastPlayed',
        component: LastPlayedSongsInPlaylistsScreen,
        title: 'Phát lần cuối',
        getColor: (isFocused: boolean) => isFocused === true ? theme.activeTintColor : theme.inactiveTintColor,
        label: ({ title, color }) => <Text style={{ color, fontSize: theme.labelFontSize, }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcons name='playlist-music' size={size ?? 35} color={color} />,
        isVisible: true,
    },
    {
        name: 'MostPlayed',
        component: MostPlayedSongsInPlaylistsScreen,
        title: 'Phát nhiều nhất',
        getColor: (isFocused: boolean) => isFocused === true ? theme.activeTintColor : theme.inactiveTintColor,
        label: ({ title, color }) => <Text style={{ color, fontSize: theme.labelFontSize, }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcons name='playlist-music' size={size ?? 35} color={color} />,
        isVisible: true,
    },
];

function TabSongsInPlaylistsNavigator() {
    return (
        <TabSongsInPlaylists.Navigator
            tabBar={(props) => (
                <CustomTabBar {...props}/>
            )}
        >
            {
                screens.map((screen: IStackNavigatorScreen<TabSongsInPlaylistsParams>, index: number) => {
                    return (
                        <TabSongsInPlaylists.Screen
                            key={index}
                            name={screen.name}
                            component={screen.component}
                            options={() => ({
                                tabBarLabel: ({ focused }) => screen.label({ title: screen.title, color: screen.getColor(focused) }),
                            })}
                        />
                    )
                })
            }
        </TabSongsInPlaylists.Navigator>
    )
}

function CustomTabBar(props: MaterialTopTabBarProps) {
    return (
        <>
            <ListTabs {...props}/>
            <ButtonAddSongsToPlaylist/>
        </>
    )
}

function ListTabs({ state, descriptors, navigation }: MaterialTopTabBarProps) {
    return (
        <Tab
            value={state.index}
            indicatorStyle={{
                backgroundColor: 'orange',
            }}
        >
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
                        <ListTabItem {...props}/>
                    )
                })
            }
        </Tab>
    )
}

function ListTabItem({
    screen,
    index,
    navigation,
    route,
    state,
}: {
    screen: IStackNavigatorScreen<TabSongsInPlaylistsParams>,
    index: number,
    navigation: NavigationHelpers<ParamListBase, MaterialTopTabNavigationEventMap>,
    route: RouteProp<ParamListBase, string>,
    state: TabNavigationState<ParamListBase>,
}) {
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
        <Tab.Item
            title={screen.label({ title: screen.title, color: screen.getColor(isFocused) })}
            onPress={onPress}
            onLongPress={onLongPress}
        />
    );
}

function ButtonAddSongsToPlaylist() {
    const dispatch = useDispatch();
    const listSelectedSongs = useGetListSelectedSongsSelector();
    const playlist = useGetPlaylistSongsShouldBeAddedSelector();
    if (!playlist) {
        return null;
    }

    return (
        <FAB
            placement='left'
            color='#3498DB'
            title={`Thêm vào "${playlist.name}"`}
            style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                zIndex: 1,
            }}
            onPress={() => dispatch(addListSelectedSongsToPlaylistAction(playlist.id, listSelectedSongs))}
            disabled={listSelectedSongs.length === 0}
        />
    )
}

export default TabSongsInPlaylistsNavigator;