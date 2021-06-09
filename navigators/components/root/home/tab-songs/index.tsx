import * as React from 'react';

import HomeHeader from '@common/components/HomeHeader';
import { IBottomSheetSection } from '@interfaces/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SongsScreen from '@screens/SongsScreen';
import SortByBottomSheet from '@common/components/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { TabSongsParams } from '@navigators/config/root/home/tab-songs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSortByBottomSheetSettings } from '@hooks/index';

const TabSongs = createStackNavigator<TabSongsParams>();

const listDataInBottomSheet: IBottomSheetSection[] = [
    {
        title: 'Sắp xếp bài hát bởi',
        defaultSelectedIndex: 1,
        selectedIndex: 0,
        items: [
            { title: 'Đã thêm ngày', icon: () => <MaterialIcons name='date-range' size={30} /> },
            { title: 'Tên', icon: () => <Ionicons name='person-circle' size={30}/> },
            { title: 'Album', icon: () => <MaterialCommunityIcons name='album' size={30} /> },
            { title: 'Nghệ sĩ', icon: () => <MaterialCommunityIcons name='music-note' size={30} /> },
            { title: 'Thời lượng', icon: () => <MaterialIcons name='timer' size={30} /> },
            { title: 'Dung lượng', icon: () => <MaterialIcons name='sd-storage' size={30} /> },
        ]
    },
    {
        title: 'Hiển thị bài hát theo',
        selectedIndex: 0,
        items: [
            { title: 'Thứ tự tăng dần', icon: () => <MaterialCommunityIcons name='sort-alphabetical-ascending' size={30} /> },
            { title: 'Thứ tự giảm dần', icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} /> },
        ]
    }
];

function TabSongsNavigators() {
    const settings = useSortByBottomSheetSettings(listDataInBottomSheet);

    return (
        <SortByBottomSheetContext.Provider value={settings}>
            <SortByBottomSheet/>
            <TabSongs.Navigator
                screenOptions={{
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Trộn' },
                                { text: 'Cân bằng' },
                                { text: 'Sắp xếp theo', onSelect: () => settings.setIsShowSortByBottomSheet(true)},
                            ]}
                        />
                    )
                }}
            >
                <TabSongs.Screen
                    name='Songs'
                    component={SongsScreen}
                />
            </TabSongs.Navigator>
        </SortByBottomSheetContext.Provider>
    )
}

export default TabSongsNavigators;