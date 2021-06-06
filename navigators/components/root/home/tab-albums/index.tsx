import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeHeader from '../../../../../common/components/HomeHeader';
import AlbumsScreen from '../../../../../screens/AlbumsScreen';
import { TabAlbumsParams } from '../../../../config/root/home/tab-albums';

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