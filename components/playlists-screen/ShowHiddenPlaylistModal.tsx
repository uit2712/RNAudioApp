import * as React from 'react';

import { CheckBox, } from 'react-native-elements';
import CustomModal from '@components/shared/CustomModal';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { IUseListChecked } from '@interfaces/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PlaylistsItem from './PlaylistsItem';
import { VirtualizedList } from 'react-native';
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
        <CustomModal
            cancelLabel='Hủy'
            confirmLabel='Hiển thị'
            onCancel={onFinished}
            onConfirm={showHiddenPlaylists}
            isDisableButtonConfirm={listChecked.listSelectedItems.length === 0}
            isVisible={isVisible}
            title={title}
        >
            <ListHiddenPlaylists
                playlists={playlists}
                {...listChecked}
            />
        </CustomModal>
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
            <PlaylistsItem
                value={item}
                onPress={onCheck}
            >
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
            </PlaylistsItem>
        )
    }
}

export default ShowHiddenPlaylistModal;