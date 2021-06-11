import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import HomeHeader from '@common/components/HomeHeader';
import PlaylistsDetailScreen from '@screens/PlaylistsDetailScreen';
import PlaylistsScreen from '@screens/PlaylistsScreen';
import { TabPlaylistsParams } from '@navigators/config/root/home/tab-playlists';
import { Text } from 'react-native';

const TabPlaylists = createStackNavigator<TabPlaylistsParams>();

function TabPlaylistsNavigator() {
    return (
        <TabPlaylists.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >
            <TabPlaylists.Screen
                name='Playlists'
                component={PlaylistsScreen}
                options={{
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Danh sách phát dự phòng' },
                                { text: 'Khôi phục danh sách phát' },
                                { text: 'Cân bằng' },
                                { text: 'Hiển thị danh sách phát ẩn' },
                                { text: 'Sắp xếp theo' },
                            ]}
                        />
                    )
                }}
            />
            <TabPlaylists.Screen
                name='Detail'
                component={PlaylistsDetailScreen}
                options={({ route }) => ({
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Thêm vào Màn hình chính' },
                                { text: 'Cân bằng' },
                            ]}
                            HeaderTitle={() => (
                                <>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{route.params.info.name}</Text>
                                    <Text style={{ textAlign: 'center' }}>{route.params.info.listSongs.length} bài hát</Text>
                                </>
                            )}
                        />
                    )
                })}
            />
        </TabPlaylists.Navigator>
    )
}

export default TabPlaylistsNavigator;