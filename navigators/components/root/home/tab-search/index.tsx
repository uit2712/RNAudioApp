import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import SearchScreen from '../../../../../screens/SearchScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '../../../../config/root';
import { TabSearchParams } from '../../../../config/root/home/tab-search';

const TabSoundPlayerDetail = createStackNavigator<TabSearchParams>();

function TabSearchNavigator() {
    return (
        <TabSoundPlayerDetail.Navigator>
            <TabSoundPlayerDetail.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    header: () => (
                        <SearchScreenHeader/>
                    )
                }}
            />
        </TabSoundPlayerDetail.Navigator>
    )
}

function SearchScreenHeader() {
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <View>
            <TouchableOpacity onPress={navigation.goBack}>
                <AntDesign
                    name='arrowleft'
                    size={30}
                />
            </TouchableOpacity>
        </View>
    )
}

export default TabSearchNavigator;