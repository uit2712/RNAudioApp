import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { CreationModalContext } from '@context-api/index';
import HomeHeader from '@common/components/HomeHeader';
import PlaylistsScreen from '@screens/PlaylistsScreen';
import { TabPlaylistsParams } from '@navigators/config/root/home/tab-playlists';
import { useCreationModal } from '@hooks/index';

const TabPlaylists = createStackNavigator<TabPlaylistsParams>();

function TabPlaylistsNavigator() {
    const modal = useCreationModal();

    return (
        <CreationModalContext.Provider value={modal}>
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
        </CreationModalContext.Provider>
    )
}

export default TabPlaylistsNavigator;