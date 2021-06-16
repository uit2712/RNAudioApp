import { clearListSelectedSongsAction, setListSelectedSongsAction, } from '@store/actions/tab-songs-addition-actions';
import { useCheckAll, useListChecked } from '@hooks/index';
import { useGetPlaylistSongsShouldBeAddedSelector, useIsAddListSelectedSongsSuccessSelector } from '@store/selectors/tab-songs-addition-selectors';

import React from 'react';
import { SelectedSongsType } from 'types/tab-songs-addition-types';
import SongsInPlaylistsScreenCheckAll from './SongsInPlaylistsScreenCheckAll';
import SongsInPlaylistsScreenSoundAdditionItem from './SongsInPlaylistsScreenSoundAdditionItem';
import { SoundFileType } from 'types/songs-screen-types';
import { VirtualizedList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function SongsInPlaylists({
    type,
    listSongs,
}: {
    type: SelectedSongsType,
    listSongs: SoundFileType[],
}) {
    const dispatch = useDispatch();
    const { checked, onCheck, setListChecked, isCheckedAllFromListChecked, listSelectedItems, reset } = useListChecked(listSongs);
    const { checkAll, isCheckedAll, } = useCheckAll({ isCheckedAllFromListChecked, setListChecked });
    React.useEffect(() => {
        dispatch(setListSelectedSongsAction({
            type,
            listSongs: listSelectedItems,
        }));

    }, [listSelectedItems.length]);

    const isAdded = useIsAddListSelectedSongsSuccessSelector();
    React.useEffect(() => {
        if (isAdded === true) {
            reset();
            dispatch(clearListSelectedSongsAction())
        }
    }, [isAdded]);

    const navigation = useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            reset();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <>
            <SongsInPlaylistsScreenCheckAll
                isChecked={isCheckedAll}
                checkAll={checkAll}
            />
            <VirtualizedList
                data={listSongs}
                renderItem={({ item, index, }: { item: SoundFileType, index: number }) => (
                    <CustomSongsInPlaylistsScreenSoundAdditionItem
                        key={item.id}
                        check={() => onCheck(index)}
                        isChecked={checked[index]}
                        item={item}
                    />
                )}
                keyExtractor={item => item.id}
                initialNumToRender={7} // Reduce initial render amount
                getItemCount={(data: SoundFileType[]) => data.length}
                getItem={(data: SoundFileType[], index: number) => data[index]}
                showsVerticalScrollIndicator={true}
                extraData={checked}
            />
        </>
    )
}

function CustomSongsInPlaylistsScreenSoundAdditionItem({
    check,
    isChecked,
    item,
}: {
    check: () => void,
    isChecked: boolean,
    item: SoundFileType,
}) {
    const playlist = useGetPlaylistSongsShouldBeAddedSelector();
    const isExisted = playlist && playlist.listSongs.findIndex(value => item.id === value.id) >= 0;

    return (
        <SongsInPlaylistsScreenSoundAdditionItem
            key={item.id}
            item={item}
            isChecked={isExisted || isChecked}
            onCheck={check}
            isDisabled={isExisted}
        />
    )
}

export default SongsInPlaylists;