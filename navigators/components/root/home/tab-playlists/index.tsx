import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import HomeHeader from '@common/components/HomeHeader';
import PlaylistsScreen from '@screens/PlaylistsScreen';
import { TabPlaylistsParams } from '@navigators/config/root/home/tab-playlists';

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
        </TabPlaylists.Navigator>
    )
}

export default TabPlaylistsNavigator;