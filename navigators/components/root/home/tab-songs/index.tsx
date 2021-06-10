import * as React from 'react';

import { setSongOrderType, setSortSongByPropertyType } from '@store/actions/songs-screen-actions';
import { useGetSongOrderType, useGetSongSortByPropertyType } from '@store/selectors/songs-screen-selectors';

import HomeHeader from '@common/components/HomeHeader';
import { IBottomSheetSectionWithType, } from '@interfaces/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SongsScreen from '@screens/SongsScreen';
import SortByBottomSheet from '@common/components/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { SortOrderType } from 'types/index';
import { SortSongByPropertyType } from 'types/songs-screen-types';
import { TabSongsParams } from '@navigators/config/root/home/tab-songs';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useSortByBottomSheetSettings } from '@hooks/index';

const TabSongs = createStackNavigator<TabSongsParams>();

function TabSongsNavigators() {
    const dispatch = useDispatch();
    const defaultSortByPropertyType = useGetSongSortByPropertyType();
    const defaultSortOrderType = useGetSongOrderType();
    const listDataInBottomSheet: IBottomSheetSectionWithType<SortSongByPropertyType | SortOrderType>[] = [
        {
            title: 'Sắp xếp bài hát bởi',
            defaultSelectedType: defaultSortByPropertyType,
            selectedType: 'name',
            items: [
                {
                    title: 'Đã thêm ngày',
                    icon: () => <MaterialIcons name='date-range' size={30} />,
                    type: 'date',
                    onPress: () => dispatch(setSortSongByPropertyType('date')),
                },
                {
                    title: 'Tên',
                    icon: () => <Ionicons name='person-circle' size={30}/>,
                    type: 'name',
                    onPress: () => dispatch(setSortSongByPropertyType('name')),
                },
                {
                    title: 'Album',
                    icon: () => <MaterialCommunityIcons name='album' size={30} />,
                    type: 'album',
                    onPress: () => dispatch(setSortSongByPropertyType('album')),
                },
                {
                    title: 'Nghệ sĩ',
                    icon: () => <MaterialCommunityIcons name='music-note' size={30} />,
                    type: 'artist',
                    onPress: () => dispatch(setSortSongByPropertyType('artist')),
                },
                {
                    title: 'Thời lượng',
                    icon: () => <MaterialIcons name='timer' size={30} />,
                    type: 'duration',
                    onPress: () => dispatch(setSortSongByPropertyType('duration')),
                },
                {
                    title: 'Dung lượng',
                    icon: () => <MaterialIcons name='sd-storage' size={30} />,
                    type: 'size',
                    onPress: () => dispatch(setSortSongByPropertyType('size')),
                },
            ]
        },
        {
            title: 'Hiển thị bài hát theo',
            defaultSelectedType: defaultSortOrderType,
            selectedType: 'asc',
            items: [
                {
                    title: 'Thứ tự tăng dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-ascending' size={30} />,
                    type: 'asc',
                    onPress: () => dispatch(setSongOrderType('asc')),
                },
                {
                    title: 'Thứ tự giảm dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} />,
                    type: 'desc',
                    onPress: () => dispatch(setSongOrderType('desc')),
                },
            ]
        }
    ];
    const settings = useSortByBottomSheetSettings<string>(listDataInBottomSheet);

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