import * as React from 'react';

import { IBottomSheetSectionWithType, ISortByBottomSheetContextWithType } from '@interfaces/index';
import { setAlbumByPropertyTypeAction, setAlbumOrderTypeAction } from '@store/actions/albums-screen-actions';
import { useGetAlbumOrderTypeSelector, useGetAlbumSortByPropertyTypeSelector } from '@store/selectors/albums-screen-selectors';

import AlbumsScreen from '@screens/AlbumsScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import HomeHeader from '@components/shared/HomeHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SortAlbumByPropertyType } from 'types/albums-screen-types';
import { SortOrderType } from 'types/index';
import { TabAlbumsParams } from '@navigators/config/drawer-home/tab-albums';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import withBottomSheet from '@hocs/shared/withBottomSheet';

const TabAlbums = createStackNavigator<TabAlbumsParams>();

function TabAlbumsNavigator({
    settings,
}: {
    settings: ISortByBottomSheetContextWithType<any>,
}) {
    return (
        <TabAlbums.Navigator
            screenOptions={{
                header: () => (
                    <HomeHeader
                        listMenuSelections={[
                            { text: 'Hiển thị album ẩn' },
                            { text: 'Cân bằng' },
                            { text: 'Sắp xếp theo', onSelect: () => settings.setIsShowSortByBottomSheet(true) },
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

function useGetListDataInBottomSheet() {
    const dispatch = useDispatch();
    const defaultSortByPropertyType = useGetAlbumSortByPropertyTypeSelector();
    const defaultSortOrderType = useGetAlbumOrderTypeSelector();
    const listDataInBottomSheet: IBottomSheetSectionWithType<SortAlbumByPropertyType | SortOrderType>[] = [
        {
            title: 'Sắp xếp album bởi',
            defaultSelectedType: defaultSortByPropertyType,
            selectedType: 'album',
            items: [
                {
                    title: 'Album',
                    icon: () => <MaterialCommunityIcons name='album' size={30} />,
                    type: 'album',
                    onPress: () => dispatch(setAlbumByPropertyTypeAction('album')),
                },
                {
                    title: 'Số lượng bài hát',
                    icon: () => <Foundation name='page-multiple' size={30}/>,
                    type: 'numberOfSongs',
                    onPress: () => dispatch(setAlbumByPropertyTypeAction('numberOfSongs')),
                },
                {
                    title: 'Nghệ sĩ',
                    icon: () => <MaterialIcons name='audiotrack' size={30} />,
                    type: 'artist',
                    onPress: () => dispatch(setAlbumByPropertyTypeAction('artist')),
                },
            ]
        },
        {
            title: 'Hiển thị album theo',
            defaultSelectedType: defaultSortOrderType,
            selectedType: 'asc',
            items: [
                {
                    title: 'Thứ tự tăng dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-ascending' size={30} />,
                    type: 'asc',
                    onPress: () => dispatch(setAlbumOrderTypeAction('asc')),
                },
                {
                    title: 'Thứ tự giảm dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} />,
                    type: 'desc',
                    onPress: () => dispatch(setAlbumOrderTypeAction('desc')),
                },
            ]
        }
    ];

    return listDataInBottomSheet;
}

export default withBottomSheet(TabAlbumsNavigator, useGetListDataInBottomSheet);
