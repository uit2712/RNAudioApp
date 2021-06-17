import * as React from 'react';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { DrawerHomeContext } from '@context-api/index';
import HomeHeader from '@components/shared/HomeHeader';
import ListSongsDetailScreen from '@screens/ListSongsDetailScreen';
import { TabListSongsDetailParams } from '@navigators/config/drawer-home/tab-list-songs-detail';
import { Text } from 'react-native';

const TabListSongs = createStackNavigator<TabListSongsDetailParams>();

function TabListSongsNavigator() {
    const { setIsShowTabBar, } = React.useContext(DrawerHomeContext);

    return (
        <TabListSongs.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
        >
            <TabListSongs.Screen
                name='ListSongs'
                component={ListSongsDetailScreen}
                options={({ route }) => ({
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Thêm vào Màn hình chính' },
                                { text: 'Cân bằng' },
                            ]}
                            HeaderTitle={() => (
                                <>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>{route.params.info.name}</Text>
                                    <Text style={{ textAlign: 'center' }}>{route.params.info.listSongs.length} bài hát</Text>
                                </>
                            )}
                            onGoBack={() => setIsShowTabBar(true)}
                        />
                    )
                })}
            />
        </TabListSongs.Navigator>
    )
}

export default TabListSongsNavigator;