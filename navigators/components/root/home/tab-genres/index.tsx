import * as React from 'react';

import { setGenreByPropertyTypeAction, setGenreOrderTypeAction } from '@store/actions/genres-screen-actions';
import { useGetGenreOrderTypeSelector, useGetGenreSortByPropertyTypeSelector } from '@store/selectors/genres-screen-selectors';

import GenresScreen from '@screens/GenresScreen';
import HomeHeader from '@common/components/HomeHeader';
import { IBottomSheetSectionWithType } from '@interfaces/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SortByBottomSheet from '@common/components/SortByBottomSheet';
import { SortByBottomSheetContext } from '@context-api/index';
import { SortGenreByPropertyType } from 'types/genres-screen-types';
import { SortOrderType } from 'types/index';
import { TabGenresParams } from '@navigators/config/root/home/tab-genres';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { useSortByBottomSheetSettings } from '@hooks/index';

const TabGenres = createStackNavigator<TabGenresParams>()

function TabGenresNavigator() {
    const listDataInBottomSheet = useGetListDataInBottomSheet();
    const settings = useSortByBottomSheetSettings<string>(listDataInBottomSheet);

    return (
        <SortByBottomSheetContext.Provider value={settings}>
            <SortByBottomSheet/>
            <TabGenres.Navigator
                screenOptions={{
                    header: () => (
                        <HomeHeader
                            listMenuSelections={[
                                { text: 'Tạo thể loại mới' },
                                { text: 'Trợ lý giọng nói' },
                                { text: 'Sắp xếp theo', onSelect: () => settings.setIsShowSortByBottomSheet(true) },
                            ]}
                        />
                    )
                }}
            >
                <TabGenres.Screen
                    name='Genres'
                    component={GenresScreen}
                />
            </TabGenres.Navigator>
        </SortByBottomSheetContext.Provider>
    )
}

function useGetListDataInBottomSheet() {
    const dispatch = useDispatch();
    const defaultSortByPropertyType = useGetGenreSortByPropertyTypeSelector();
    const defaultSortOrderType = useGetGenreOrderTypeSelector();
    const listDataInBottomSheet: IBottomSheetSectionWithType<SortGenreByPropertyType | SortOrderType>[] = [
        {
            title: 'Sắp xếp thể loại bởi',
            defaultSelectedType: defaultSortByPropertyType,
            selectedType: 'name',
            items: [
                {
                    title: 'Tên',
                    icon: () => <MaterialIcons name='audiotrack' size={30} />,
                    type: 'name',
                    onPress: () => dispatch(setGenreByPropertyTypeAction('name')),
                },
            ]
        },
        {
            title: 'Hiển thị thể loại theo',
            defaultSelectedType: defaultSortOrderType,
            selectedType: 'asc',
            items: [
                {
                    title: 'Thứ tự tăng dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-ascending' size={30} />,
                    type: 'asc',
                    onPress: () => dispatch(setGenreOrderTypeAction('asc')),
                },
                {
                    title: 'Thứ tự giảm dần',
                    icon: () => <MaterialCommunityIcons name='sort-alphabetical-descending' size={30} />,
                    type: 'desc',
                    onPress: () => dispatch(setGenreOrderTypeAction('desc')),
                },
            ]
        }
    ];

    return listDataInBottomSheet;
}

export default TabGenresNavigator;