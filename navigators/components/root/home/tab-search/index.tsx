import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../../../config/root';
import { TabSearchParams } from '../../../../config/root/home/tab-search';
import { Input } from 'react-native-elements';
import { DrawerHomeContext } from '../../../../../context-api';
import TabSourceNavigator from './tab-source';

const TabSoundPlayerDetail = createStackNavigator<TabSearchParams>();

function TabSearchNavigator() {
    return (
        <TabSoundPlayerDetail.Navigator
            screenOptions={{
                header: () => (
                    <SearchScreenHeader/>
                )
            }}
        >
            <TabSoundPlayerDetail.Screen
                name='Search'
                component={TabSourceNavigator}
            />
        </TabSoundPlayerDetail.Navigator>
    )
}

function SearchScreenHeader() {
    const navigation = useNavigation<RootNavigationProp>();
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);

    function goBack() {
        setIsShowTabBar(true);
        navigation.goBack();
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={goBack}>
                <AntDesign
                    name='arrowleft'
                    size={30}
                />
            </TouchableOpacity>
            <SearchScreenHeaderInput/>
        </View>
    )
}

function SearchScreenHeaderInput() {
    return (
        <Input
            autoFocus={true}
            style={{
                alignSelf: 'stretch',
                marginRight: 20,
            }}
            containerStyle={{
                height: 40,
            }}
            placeholder='Tìm kiếm'
        />
    )
}

export default TabSearchNavigator;