import * as React from 'react';

import { IBottomSheetSectionWithType, ISortByBottomSheetContextWithType, } from '@interfaces/index';
import { setSongOrderTypeAction, setSortSongByPropertyTypeAction } from '@store/actions/songs-screen-actions';
import { useGetSongOrderType, useGetSongSortByPropertyType } from '@store/selectors/songs-screen-selectors';

import HomeHeader from '@components/shared/HomeHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SongsScreen from '@screens/SongsScreen';
import { SortOrderType } from 'types/index';
import { SortSongByPropertyType } from 'types/songs-screen-types';
import { TabSongsParams } from '@navigators/config/drawer-home/tab-songs';
import UpdatingSongScreen from '@screens/UpdatingSongScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import withBottomSheet from '@hocs/shared/withBottomSheet';

const TabSongs = createStackNavigator<TabSongsParams>();

function TabSongsNavigators({
    settings,
}: {
    settings: ISortByBottomSheetContextWithType<any>,
}) {
    return (
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
            <TabSongs.Screen
                name='UpdatingSong'
                component={UpdatingSongScreen}
            />
        </TabSongs.Navigator>
    )
}

function useGetListDataInBottomSheet() {
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
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('date')),
                },
                {
                    title: 'Tên',
                    icon: () => <Ionicons name='person-circle' size={30}/>,
                    type: 'name',
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('name')),
                },
                {
                    title: 'Album',
                    icon: () => <MaterialCommunityIcons name='album' size={30} />,
                    type: 'album',
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('album')),
                },
                {
                    title: 'Nghệ sĩ',
                    icon: () => <MaterialCommunityIcons name='music-note' size={30} />,
                    type: 'artist',
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('artist')),
                },
                {
                    title: 'Thời lượng',
                    icon: () => <MaterialIcons name='timer' size={30} />,
                    type: 'duration',
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('duration')),
                },
                {
                    title: 'Dung lượng',
                    icon: () => <MaterialIcons name='sd-storage' size={30} />,
                    type: 'size',
                    onPress: () => dispatch(setSortSongByPropertyTypeAction('size')),
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
                    onPress: () => dispatch(setSongOrderTypeAction('asc')),
                },
                {
                    title: 'Thứ tự giảm dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} />,
                    type: 'desc',
                    onPress: () => dispatch(setSongOrderTypeAction('desc')),
                },
            ]
        }
    ];
    return listDataInBottomSheet;
}

export default withBottomSheet(TabSongsNavigators, useGetListDataInBottomSheet);