import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { CreationModalContext } from '@context-api/index';
import HomeHeader from '@components/shared/HomeHeader';
import PlaylistsScreen from '@screens/PlaylistsScreen';
import ShowHiddenPlaylistModal from '@components/playlists-screen/ShowHiddenPlaylistModal';
import { TabPlaylistsParams } from '@navigators/config/root/home/tab-playlists';
import { setPlaylistVisibilityAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';
import { useOverlayModal } from '@hooks/index';

const TabPlaylists = createStackNavigator<TabPlaylistsParams>();

function TabPlaylistsNavigator() {
    const modal = useOverlayModal();

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
                        header: () => <TabPlaylistsHeader/>
                    }}
                />
            </TabPlaylists.Navigator>
        </CreationModalContext.Provider>
    )
}

function TabPlaylistsHeader() {
    const dispatch = useDispatch();
    const { toggleOverlay, isVisible } = useOverlayModal();

    return (
        <>
            <HomeHeader
                listMenuSelections={[
                    { text: 'Danh sách phát dự phòng' },
                    { text: 'Khôi phục danh sách phát' },
                    { text: 'Cân bằng' },
                    { text: 'Hiển thị danh sách phát ẩn', onSelect: toggleOverlay, },
                    { text: 'Sắp xếp theo' },
                ]}
            />
            <ShowHiddenPlaylistModal
                title='Danh sách phát ẩn'
                toggleOverlay={toggleOverlay}
                isVisible={isVisible}
                onConfirm={(listPlaylistIds, onFinished) => {
                    dispatch(setPlaylistVisibilityAction({
                        isHidden: false,
                        listPlaylistIds: listPlaylistIds
                    }));
                    onFinished();
                }}
            />
        </>
    )
}

export default TabPlaylistsNavigator;