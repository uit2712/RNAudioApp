import * as React from 'react';

import ArtistsScreen from '../../../../../screens/ArtistsScreen';
import HomeHeader from '@common/components/HomeHeader';
import { TabArtistsParams } from '@navigators/config/root/home/tab-artists';
import { createStackNavigator } from '@react-navigation/stack';

const TabArtists = createStackNavigator<TabArtistsParams>();

function TabArtistsNavigators() {
    return (
        <TabArtists.Navigator
            screenOptions={{
                header: () => (
                    <HomeHeader
                        listMenuSelections={[
                            { text: 'Hiển thị nghệ sĩ ẩn' },
                            { text: 'Cân bằng' },
                            { text: 'Sắp xếp theo' },
                        ]}
                    />
                )
            }}
        >
            <TabArtists.Screen
                name='Artists'
                component={ArtistsScreen}
                options={{
                    title: 'Nghệ sĩ'
                }}
            />
        </TabArtists.Navigator>
    )
}

export default TabArtistsNavigators;