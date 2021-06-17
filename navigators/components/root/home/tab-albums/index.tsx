import * as React from 'react';

import { setAlbumByPropertyTypeAction, setAlbumOrderTypeAction } from '@store/actions/albums-screen-actions';
import { useGetAlbumOrderTypeSelector, useGetAlbumSortByPropertyTypeSelector } from '@store/selectors/albums-screen-selectors';

import AlbumsScreen from '@screens/AlbumsScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import HomeHeader from '@components/shared/HomeHeader';
import { IBottomSheetSectionWithType } from '@interfaces/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SortAlbumByPropertyType } from 'types/albums-screen-types';
import SortByBottomSheet from '@common/components/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { SortOrderType } from 'types/index';
import { TabAlbumsParams } from '@navigators/config/root/home/tab-albums';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useSortByBottomSheetSettings } from '@hooks/index';

const TabAlbums = createStackNavigator<TabAlbumsParams>();

function TabAlbumsNavigator() {
    const listDataInBottomSheet = useGetListDataInBottomSheet();
    const settings = useSortByBottomSheetSettings<string>(listDataInBottomSheet);

    return (
        <SortByBottomSheetContext.Provider value={settings}>
            <SortByBottomSheet/>
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
        </SortByBottomSheetContext.Provider>
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

export default TabAlbumsNavigator;
