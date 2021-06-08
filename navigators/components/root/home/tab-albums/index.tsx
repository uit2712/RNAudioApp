import * as React from 'react';

import AlbumsScreen from '@screens/AlbumsScreen';
import HomeHeader from '@common/components/HomeHeader';
import { TabAlbumsParams } from '@navigators/config/root/home/tab-albums';
import { createStackNavigator } from '@react-navigation/stack';

const TabAlbums = createStackNavigator<TabAlbumsParams>();

function TabAlbumsNavigator() {
    return (
        <TabAlbums.Navigator
            screenOptions={{
                header: () => (
                    <HomeHeader
                        listMenuSelections={[
                            { text: 'Hiển thị album ẩn' },
                            { text: 'Cân bằng' },
                            { text: 'Sắp xếp theo' },
                        ]}
                    />
                )
            }}
        >
            <TabAlbums.Screen
                name='Albums'
                component={AlbumsScreen}
            />
        </TabAlbums.Navigator>
    )
}

export default TabAlbumsNavigator;