import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SoundPlayerScreen from '../../../../../screens/SoundPlayerScreen';
import { TabSoundPlayerDetailParams } from '../../../../config/root/home/tab-detail';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { DrawerHomeContext } from '../../../../../context-api';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { View } from 'react-native';
import { IMenuSelection } from '../../../../../interfaces';
import CustomMenu from '../../../../../common/components/CustomMenu';

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
                    headerRight: () => <SoundPlayerDetailScreenHeaderRight/>
                })}
            />
        </TabSoundPlayerDetail.Navigator>
    )
}

function SoundPlayerDetailScreenHeaderLeft({ navigation }: { navigation: any }) {
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
            />
        </TouchableOpacity>
    );
}

function SoundPlayerDetailScreenHeaderRight() {
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
                    color='black'
                />
            </TouchableOpacity>
            <CustomMenu
                listMenuSelections={listMenuSelections}
                triggerComponent={() => (
                    <EntypoIcon
                        name='dots-three-vertical'
                        size={30}
                        color='black'
                    />
                )}
            />
        </View>
    )
}

export default TabSoundPlayerDetailNavigator;