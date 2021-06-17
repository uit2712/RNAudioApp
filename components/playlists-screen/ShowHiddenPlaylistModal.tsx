import * as React from 'react';

import { CheckBox, ListItem, Overlay } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';

import ButtonsModal from '@components/shared/ButtonsModal';
import FastImage from 'react-native-fast-image';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { IUseListChecked } from '@interfaces/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { useGetHiddenPlaylistsSelector } from '@store/selectors/playlists-screen-selectors';
import { useListChecked } from '@hooks/index';

function ShowHiddenPlaylistModal({
    title,
    onConfirm,
    isVisible,
    toggleOverlay,
}: {
    title: string,
    onConfirm: (listPlaylistIds: string[], onFinished: () => void) => void,
    isVisible: boolean,
    toggleOverlay: () => void,
}) {
    const playlists = useGetHiddenPlaylistsSelector();
    const listChecked = useListChecked(playlists);
    const showHiddenPlaylists = () => onConfirm(listChecked.listSelectedItems.map(item => item.id), onFinished);
    const onFinished = () => {
        toggleOverlay();
        listChecked.reset();
    }

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={toggleOverlay}
            transparent={true}
        >
            <View style={styles.modal}>
                <View
                    style={styles.modalTitle}
                >
                    <Text style={styles.modalTitleText}>{title}</Text>
                </View>
                <ListHiddenPlaylists
                    playlists={playlists}
                    {...listChecked}
                />
                <ButtonsModal
                    cancelLabel='Hủy'
                    confirmLabel='Hiển thị'
                    onCancel={onFinished}
                    onConfirm={showHiddenPlaylists}
                    isDisabledConfirmButton={listChecked.listSelectedItems.length === 0}
                />
            </View>
        </Overlay>
    )
}

interface IListHiddenPlaylistsProps extends IUseListChecked<IPlaylist> {
    playlists: IPlaylist[];
}
function ListHiddenPlaylists({
    checked,
    onCheck,
    playlists,
}: IListHiddenPlaylistsProps) {
    return (
        <VirtualizedList
            data={playlists}
            renderItem={({ item, index }: { item: IPlaylist, index: number }) => {
                const check = () => onCheck(index);
                return (
                    <ListHiddenPlaylistItem
                        key={index}
                        item={item}
                        onCheck={check}
                        isChecked={checked[index]}
                    />
                )
            }}
            keyExtractor={(item) => item.id}
            getItemCount={(data: IPlaylist[]) => data.length}
            getItem={(data: IPlaylist[], index: number) => data[index]}
        />
    )
}

interface IListHiddenPlaylistItemProps {
    item: IPlaylist,
    onCheck: () => void,
    isChecked: boolean,
}
class ListHiddenPlaylistItem extends React.Component<IListHiddenPlaylistItemProps> {
    shouldComponentUpdate(nextProps: IListHiddenPlaylistItemProps) {
        const isShouldUpdate = nextProps.item.id === this.props.item.id && nextProps.isChecked !== this.props.isChecked;
        return isShouldUpdate;
    }

    render() {
        const { item, onCheck, isChecked } = this.props;
        return (
            <ListItem
                Component={TouchableOpacity}
                onPress={onCheck}
                style={{
                    width: '100%',
                }}
                bottomDivider
            >
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: item.shadowColor,
                        left: 48,
                        width: 90,
                        height: 90,
                        borderRadius: 45,
                    }}
                />
                <FastImage
                    style={{ width: 100, height: 100, borderRadius: 50, }}
                    source={item.cover}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListHiddenPlaylistItemCheckbox
                    onCheck={onCheck}
                    isChecked={isChecked}
                />
            </ListItem>
        )
    }
}

interface ListHiddenPlaylistItemCheckboxProps {
    onCheck?: () => void,
    isChecked: boolean,
}
function ListHiddenPlaylistItemCheckbox({
    isChecked,
    onCheck,
}: ListHiddenPlaylistItemCheckboxProps) {
    return (
        <CheckBox
            center
            checkedIcon={
                <MaterialIcons
                    name='check-box'
                    size={30}
                />
            }
            uncheckedIcon={
                <MaterialIcons
                    name='check-box-outline-blank'
                    size={30}
                />
            }
            checked={isChecked}
            onPress={onCheck}
        />
    )
}

const styles = StyleSheet.create({
    modal: {
        width: ScreenWidth * 0.8,
        borderRadius: 15,
    },
    modalTitle: {
        backgroundColor: 'rgb(66, 76, 177)',
        marginTop: -10,
        marginHorizontal: -10,
        paddingVertical: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 10,
    },
    modalCover: {
        width: ScreenWidth * 0.4,
        height: ScreenWidth * 0.4,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    modalTitleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    modalInput: {
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
    },
});

export default ShowHiddenPlaylistModal;