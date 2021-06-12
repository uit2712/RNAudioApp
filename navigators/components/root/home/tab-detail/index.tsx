import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext } from '@context-api/index';
import { addAudioToPlaylistAction, removeAudioFromPlaylistAction } from '@store/actions/playlists-screen-actions';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomMenu from '@common/components/CustomMenu';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Favorite from '@common/components/Favorite';
import { IMenuSelection } from '@interfaces/index';
import { SoundPlayerDetailThemeContext } from '@navigators/themes';
import SoundPlayerScreen from '@screens/SoundPlayerScreen';
import { TabSoundPlayerDetailParams } from '@navigators/config/root/home/tab-detail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useFavorite } from '@hooks/index';
import { useIsAudioFromFavoritePlaylistSelector } from '@store/selectors/playlists-screen-selectors';

const TabSoundPlayerDetail = createStackNavigator<TabSoundPlayerDetailParams>();

function TabSoundPlayerDetailNavigator() {
    return (
        <TabSoundPlayerDetail.Navigator>
            <TabSoundPlayerDetail.Screen
                name='SoundPlayerDetail'
                component={SoundPlayerScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => <SoundPlayerDetailScreenHeaderLeft navigation={navigation}/>,
                    headerRight: () => <SoundPlayerDetailScreenHeaderRight/>,
                    headerTransparent: true,
                })}
            />
        </TabSoundPlayerDetail.Navigator>
    )
}

function SoundPlayerDetailScreenHeaderLeft({ navigation }: { navigation: any }) {
    const theme = React.useContext(SoundPlayerDetailThemeContext);
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
                color={theme.colors.iconInactive}
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
    const listMenuSelections: IMenuSelection[] = [
        { text: 'Chia sẻ', },
        { text: 'Đặt tốc độ phát lại' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Thêm vào danh sách phát' },
        { text: 'Cân bằng' },
        { text: 'Hẹn giờ ngủ' },
        { text: 'Đặt làm nhạc chuông' },
        { text: 'Đi đến Album' },
        { text: 'Đi đến Nghệ sĩ' },
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

export default TabSoundPlayerDetailNavigator;