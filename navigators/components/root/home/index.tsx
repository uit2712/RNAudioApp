import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import { DrawerHomeParams } from '../../../config/root/home';
import TabAlbumsNavigator from './tab-albums';
import TabArtistsNavigators from './tab-artists';
import TabPlaylistsNavigator from './tab-playlists';
import TabSongsNavigators from './tab-songs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        icon: ({ color, size }) => <MaterialCommunityIcon name='playlist-music' size={size ?? 35} color={color}/>,
    },
    {
        name: 'TabSongs',
        title: 'Bài hát',
        component: TabSongsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#FFC300' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Fontisto name='applemusic' size={size ?? 35} color={color}/>,
    },
    {
        name: 'TabArtists',
        title: 'Nghệ sĩ',
        component: TabArtistsNavigators,
        getColor: (isFocused: boolean) => isFocused === true ? '#A569BD' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <Ionicons name='md-person-circle-sharp' size={size ?? 35} color={color}/>,
    },
    {
        name: 'TabAlbums',
        title: 'Album',
        component: TabAlbumsNavigator,
        getColor: (isFocused: boolean) => isFocused === true ? '#2ECC71' : 'gray',
        label: ({ title, color }) => <Text style={{ color }}>{title}</Text>,
        icon: ({ color, size }) => <MaterialCommunityIcon name='album' size={size ?? 35} color={color}/>,
    }
]

const iconSize = 25;

function DrawerHomeNavigator() {
    return (
        <DrawerHome.Navigator initialRouteName='TabSongs'>
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

export default DrawerHomeNavigator;