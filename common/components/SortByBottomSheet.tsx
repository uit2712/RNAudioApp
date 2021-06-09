import * as React from 'react';

import { BottomSheet, ListItem, Text } from 'react-native-elements';
import { IBottomSheetSection, IBottomSheetSectionItem } from '@interfaces/index';
import { TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SortByBottomSheetContext } from '@context-api/index';

function SortByBottomSheet() {
    const bottomSheetSettings = React.useContext(SortByBottomSheetContext);

    return (
        <BottomSheet
            isVisible={bottomSheetSettings.isShowSortByBottomSheet}
            containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            modalProps={{
                
            }}
        >
            {
                bottomSheetSettings.data.map((item: IBottomSheetSection, index: number) => (
                    <View key={index}>
                        <View style={{ height: 30, backgroundColor: 'white', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, marginLeft: 20, color: 'gray' }}>{item.title}</Text>
                        </View>
                        <SortByBottomSheetSection sectionIndex={index} items={item.items}/>
                    </View>
                ))
            }
            <BottomSheetCloseButton/>
        </BottomSheet>
    )
}

function BottomSheetCloseButton() {
    const bottomSheetSettings = React.useContext(SortByBottomSheetContext);
    
    return (
        <View style={{ position: 'absolute', right: 0, zIndex: 1 }}>
            <TouchableOpacity onPress={() => bottomSheetSettings.setIsShowSortByBottomSheet(false)}>
                <AntDesign name='closecircle' size={30}/>
            </TouchableOpacity>
        </View>
    )
}

function SortByBottomSheetSection({
    items,
    sectionIndex,
}: {
    items: IBottomSheetSectionItem[],
    sectionIndex: number,
}) {
    return (
        <>
            {
                items.map((item: IBottomSheetSectionItem, index: number) => (
                    <SortByBottomSheetSectionItem
                        key={index}
                        index={index}
                        item={item}
                        sectionIndex={sectionIndex}
                    />
                ))
            }
        </>
    )
}

function SortByBottomSheetSectionItem({
    item,
    index,
    sectionIndex,
}: {
    item: IBottomSheetSectionItem,
    index: number,
    sectionIndex: number,
}) {
    const bottomSheetSettings = React.useContext(SortByBottomSheetContext);

    function onPress() {
        if (index !== bottomSheetSettings.getSelectedIndex(sectionIndex)) {
            item.onPress && item.onPress();
            bottomSheetSettings.setSelectedIndex(sectionIndex, index);
        }
    }

    return (
        <ListItem onPress={onPress}>
            { item.icon && <item.icon/> }
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            {
                index === bottomSheetSettings.getSelectedIndex(sectionIndex) && (
                    <Ionicons
                        name='checkmark-circle'
                        size={25}
                    />
                )
            }
        </ListItem>
    )
}

export default SortByBottomSheet;