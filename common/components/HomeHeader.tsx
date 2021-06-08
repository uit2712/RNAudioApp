import * as React from 'react';

import CustomMenu from '@common/components/CustomMenu';
import { DrawerHomeContext } from '@context-api/index';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { IMenuSelection } from '@interfaces/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootNavigationProp } from '@navigators/config/root';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, } from 'react-native';
import { useNavigation } from '@react-navigation/core';

function HomeHeader({
    listMenuSelections,
}: {
    listMenuSelections?: IMenuSelection[],
}) {
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
                <HomeHeaderLeftMenu/>
            </View>
            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <HomeHeaderSearch/>
                <TouchableOpacity>
                    <Ionicons
                        name='mic'
                        size={30}
                    />
                </TouchableOpacity>
                <HomeHeaderRightMenu listMenuSelections={listMenuSelections}/>
            </View>
        </View>
    )
}

function HomeHeaderLeftMenu() {
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <TouchableOpacity onPress={navigation.toggleDrawer}>
            <MaterialIcons
                name='menu'
                size={30}
            />
        </TouchableOpacity>
    )
}

function HomeHeaderSearch() {
    const navigation = useNavigation<RootNavigationProp>();
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);

    return (
        <TouchableOpacity
            onPress={() => {
                setIsShowTabBar(false);
                navigation.navigate('Home', {
                    screen: 'TabSearch',
                    params: {
                        screen: 'Search',
                        params: {
                            screen: 'Offline',
                            params: {}
                        }
                    }
                })
            }}
        >
            <Feather
                name='search'
                size={30}
            />
        </TouchableOpacity>
    )
}

function HomeHeaderRightMenu({
    listMenuSelections
}: {
    listMenuSelections?: IMenuSelection[],
}) {
    if (!listMenuSelections) {
        return null;
    }
    
    return (
        <CustomMenu
            listMenuSelections={listMenuSelections}
            triggerComponent={() => (
                <Entypo
                    name='dots-three-vertical'
                    size={30}
                />
            )}
        />
    )
}

export default HomeHeader;