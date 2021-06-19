import * as React from 'react';

import { IBottomSheetSectionWithType, ISortByBottomSheetContextWithType } from '@interfaces/index';
import { setGenreByPropertyTypeAction, setGenreIsShouldRefreshAction, setGenreOrderTypeAction } from '@store/actions/genres-screen-actions';
import { useGetGenreOrderTypeSelector, useGetGenreSortByPropertyTypeSelector } from '@store/selectors/genres-screen-selectors';

import GenresScreen from '@screens/GenresScreen';
import HomeHeader from '@components/shared/HomeHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SortGenreByPropertyType } from 'types/genres-screen-types';
import { SortOrderType } from 'types/index';
import { TabGenresParams } from '@navigators/config/drawer-home/tab-genres';
import { createGenre } from '@functions/genres-screen-functions';
import { createStackNavigator } from '@react-navigation/stack';
import { showUpdatingModal } from '@functions/index';
import { useDispatch } from 'react-redux';
import withBottomSheet from '@hocs/shared/withBottomSheet';

const TabGenres = createStackNavigator<TabGenresParams>()

function TabGenresNavigator({
    settings,
}: {
    settings: ISortByBottomSheetContextWithType<any>,
}) {
    const dispatch = useDispatch();

    return (
        <TabGenres.Navigator
            screenOptions={{
                header: () => (
                    <HomeHeader
                        listMenuSelections={[
                            {
                                text: 'Tạo thể loại mới',
                                onSelect: () => {
                                    const onConfirm = (name: string, onFinished: () => void) => {
                                        createGenre(name).then(() => {
                                            onFinished();
                                            dispatch(setGenreIsShouldRefreshAction(true));
                                        }).catch(console.log)
                                    };
                                    showUpdatingModal({
                                        inputLabel: 'Tên',
                                        title: 'Tạo thể loại mới',
                                        onConfirm,
                                        cancelLabel: 'Hủy',
                                        confirmLabel: 'Xong',
                                    });
                                },
                            },
                            { text: 'Trợ lý giọng nói' },
                            {
                                text: 'Sắp xếp theo',
                                onSelect: () => settings.setIsShowSortByBottomSheet(true),
                            },
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

export default withBottomSheet(TabGenresNavigator, useGetListDataInBottomSheet);