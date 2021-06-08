import * as React from 'react';

import HomeHeader from '@common/components/HomeHeader';
import PlaylistsScreen from '../../../../../screens/PlaylistsScreen';
import { TabPlaylistsParams } from '@navigators/config/root/home/tab-playlists';
import { createStackNavigator } from '@react-navigation/stack';

const TabPlaylists = createStackNavigator<TabPlaylistsParams>();

function TabPlaylistsNavigator() {
    return (
        <TabPlaylists.Navigator
            screenOptions={{
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
        >
            <TabPlaylists.Screen
                name='Playlists'
                component={PlaylistsScreen}
            />
        </TabPlaylists.Navigator>
    )
}

export default TabPlaylistsNavigator;