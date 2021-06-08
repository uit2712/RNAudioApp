import * as React from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CustomMenu from '@common/components/CustomMenu';
import { DrawerHomeContext } from '@context-api/index';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { IMenuSelection } from '@interfaces/index';
import { SoundPlayerDetailThemeContext } from '../../../../themes';
import SoundPlayerScreen from '@screens/SoundPlayerScreen';
import { TabSoundPlayerDetailParams } from '@navigators/config/root/home/tab-detail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

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
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);

    return (
        <TouchableOpacity
            onPress={() => {
                setIsShowTabBar(true);
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
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 20, }}>
                <AntDesignIcon
                    name='hearto'
                    size={30}
                    color={theme.colors.iconInactive}
                />
            </TouchableOpacity>
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
        </View>
    )
}

export default TabSoundPlayerDetailNavigator;