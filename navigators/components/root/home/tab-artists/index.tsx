import * as React from 'react';

import { setArtistByPropertyTypeAction, setArtistOrderTypeAction, } from '@store/actions/artists-screen-actions';
import { useGetArtistOrderType, useGetArtistSortByPropertyType } from '@store/selectors/artists-screen-selectors';

import ArtistsScreen from '@screens/ArtistsScreen';
import Foundation from 'react-native-vector-icons/Foundation';
import HomeHeader from '@common/components/HomeHeader';
import { IBottomSheetSectionWithType } from '@interfaces/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SortArtistByPropertyType } from 'types/artists-screen-types';
import SortByBottomSheet from '@common/components/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { SortOrderType } from 'types/index';
import { TabArtistsParams } from '@navigators/config/root/home/tab-artists';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useSortByBottomSheetSettings } from '@hooks/index';

const TabArtists = createStackNavigator<TabArtistsParams>();

function TabArtistsNavigators() {
    const listDataInBottomSheet = useGetListDataInBottomSheet();
    const settings = useSortByBottomSheetSettings<string>(listDataInBottomSheet);

    return (
        <SortByBottomSheetContext.Provider value={settings}>
            <SortByBottomSheet/>
            <TabArtists.Navigator
                screenOptions={{
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Hiển thị nghệ sĩ ẩn' },
                                { text: 'Cân bằng' },
                                { text: 'Sắp xếp theo', onSelect: () => settings.setIsShowSortByBottomSheet(true) },
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
        </SortByBottomSheetContext.Provider>
    )
}

function useGetListDataInBottomSheet() {
    const dispatch = useDispatch();
    const defaultSortByPropertyType = useGetArtistSortByPropertyType();
    const defaultSortOrderType = useGetArtistOrderType();
    const listDataInBottomSheet: IBottomSheetSectionWithType<SortArtistByPropertyType | SortOrderType>[] = [
        {
            title: 'Sắp xếp nghệ sĩ bởi',
            defaultSelectedType: defaultSortByPropertyType,
            selectedType: 'album',
            items: [
                {
                    title: 'Album',
                    icon: () => <MaterialCommunityIcons name='album' size={30} />,
                    type: 'album',
                    onPress: () => dispatch(setArtistByPropertyTypeAction('album')),
                },
                {
                    title: 'Số lượng bài hát',
                    icon: () => <Foundation name='page-multiple' size={30}/>,
                    type: 'numberOfSongs',
                    onPress: () => dispatch(setArtistByPropertyTypeAction('numberOfSongs')),
                },
                {
                    title: 'Nghệ sĩ',
                    icon: () => <MaterialIcons name='audiotrack' size={30} />,
                    type: 'artist',
                    onPress: () => dispatch(setArtistByPropertyTypeAction('artist')),
                },
            ]
        },
        {
            title: 'Hiển thị nghệ sĩ theo',
            defaultSelectedType: defaultSortOrderType,
            selectedType: 'asc',
            items: [
                {
                    title: 'Thứ tự tăng dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-ascending' size={30} />,
                    type: 'asc',
                    onPress: () => dispatch(setArtistOrderTypeAction('asc')),
                },
                {
                    title: 'Thứ tự giảm dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} />,
                    type: 'desc',
                    onPress: () => dispatch(setArtistOrderTypeAction('desc')),
                },
            ]
        }
    ];

    return listDataInBottomSheet;
}

export default TabArtistsNavigators;