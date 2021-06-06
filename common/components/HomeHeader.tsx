import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { View, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootNavigationProp } from '../../navigators/config/root';

function HomeHeader() {
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <View
            style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                paddingHorizontal: 10,
            }}
        >
            <View style={{ flex: 4, }}>
                <TouchableOpacity onPress={navigation.toggleDrawer}>
                    <MaterialIcons
                        name='menu'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity>
                    <Feather
                        name='search'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                        name='mic'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo
                        name='dots-three-vertical'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader;