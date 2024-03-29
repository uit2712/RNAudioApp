import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext, } from '@context-api/index';

import AddSongToPlaylistScreen from '@screens/AddSongToPlaylistScreen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomMenu from '@components/shared/CustomMenu';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Favorite from '@components/shared/Favorite';
import { IMenuSelection } from '@interfaces/index';
import { SoundPlayerDetailThemeContext } from '@navigators/themes';
import SoundPlayerScreen from '@screens/SoundPlayerScreen';
import { TabOthersParams, } from '@navigators/config/drawer-home/tab-others';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getListSongsByAlbumId } from '@functions/albums-screen-functions';
import { navigate } from '@navigators/config';
import { useGetAlbumByIdSelector } from '@store/selectors/albums-screen-selectors';

const TabOthers = createStackNavigator<TabOthersParams>();

function TabOthersNavigator() {
    const theme = React.useContext(SoundPlayerDetailThemeContext);

    return (
        <TabOthers.Navigator>
            <TabOthers.Screen
                name='SoundPlayerDetail'
                component={SoundPlayerScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
                        <BackButton
                            navigation={navigation}
                            color={theme.colors.iconInactive}
                        />
                    ),
                    headerRight: () => <SoundPlayerDetailScreenHeaderRight/>,
                    headerTransparent: true,
                })}
            />
            <TabOthers.Screen
                name='AddSongToPlaylist'
                component={AddSongToPlaylistScreen}
                options={({ navigation }) => ({
                    title: 'Thêm vào Danh sách phát',
                    headerLeft: () => (
                        <BackButton
                            navigation={navigation}
                            color='black'
                        />
                    ),
                    // headerTransparent: true,
                })}
            />
        </TabOthers.Navigator>
    )
}

function BackButton({
    navigation,
    color,
}: {
    navigation: any,
    color: string,
}) {
    
    const { setIsShowTabBar, setIsShowMiniPlayer } = React.useContext(DrawerHomeContext);

    return (
        <TouchableOpacity
            onPress={() => {
                setIsShowTabBar(true);
                setIsShowMiniPlayer(true);
                navigation.goBack();
            }}
        >
            <AntDesignIcon
                name='left'
                size={30}
                color={color}
            />
        </TouchableOpacity>
    );
}

function SoundPlayerDetailScreenHeaderRight() {
    const theme = React.useContext(SoundPlayerDetailThemeContext);

    return (
        <View style={{ flexDirection: 'row' }}>
            <Favorite
                activeColor='red'
                inactiveColor={theme.colors.iconInactive}
                customStyle={{ marginRight: 20, }}
            />
            <SoundPlayerDetailScreenHeaderRightMenu/>
        </View>
    )
}

function SoundPlayerDetailScreenHeaderRightMenu() {
    const theme = React.useContext(SoundPlayerDetailThemeContext);
    const player = React.useContext(SoundPlayerContext);
    const album = useGetAlbumByIdSelector(player.currentAudioInfo.originalInfo.albumId);

    const listMenuSelections: IMenuSelection[] = [
        { text: 'Chia sẻ', },
        { text: 'Đặt tốc độ phát lại' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Thêm vào danh sách phát' },
        { text: 'Cân bằng' },
        { text: 'Hẹn giờ ngủ' },
        { text: 'Đặt làm nhạc chuông' },
        {
            text: 'Đi đến Album',
            onSelect: async () => {
                const info = await getListSongsByAlbumId(album);
                navigate('Home', {
                    screen: 'TabListSongs',
                    params: {
                        screen: 'ListSongs',
                        params: {
                            type: 'album',
                            info
                        }
                    }
                })
            }
        },
        {
            text: 'Đi đến Nghệ sĩ',
        },
    ]

    return (
        <CustomMenu
            listMenuSelections={listMenuSelections}
            triggerComponent={() => (
                <EntypoIcon
                    name='dots-three-vertical'
                    size={30}
                    color={theme.colors.iconInactive}
                />
            )}
        />
    )
}

export default TabOthersNavigator;