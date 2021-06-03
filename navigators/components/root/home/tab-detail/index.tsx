import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SoundPlayerScreen from '../../../../../screens/SoundPlayerScreen';
import { TabSoundPlayerDetailParams } from '../../../../config/root/home/tab-detail';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { DrawerHomeContext } from '../../../../../context-api';

const TabSoundPlayerDetail = createStackNavigator<TabSoundPlayerDetailParams>();

function TabSoundPlayerDetailNavigator() {
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);

    return (
        <TabSoundPlayerDetail.Navigator>
            <TabSoundPlayerDetail.Screen
                name='SoundPlayerDetail'
                component={SoundPlayerScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (
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
                    )
                })}
            />
        </TabSoundPlayerDetail.Navigator>
    )
}

export default TabSoundPlayerDetailNavigator;