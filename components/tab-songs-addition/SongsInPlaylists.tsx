import { clearListSelectedSongsAction, setListSelectedSongsAction, } from '@store/actions/tab-songs-addition-actions';
import { useCheckAll, useListChecked } from '@hooks/index';

import React from 'react';
import { SelectedSongsType } from 'types/tab-songs-addition-types';
import SongsInPlaylistsScreenCheckAll from './SongsInPlaylistsScreenCheckAll';
import SongsInPlaylistsScreenSoundAdditionItem from './SongsInPlaylistsScreenSoundAdditionItem';
import { SoundFileType } from 'types/songs-screen-types';
import { VirtualizedList } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIsAddListSelectedSongsSuccessSelector } from '@store/selectors/tab-songs-addition-selectors';

function SongsInPlaylists({
    type,
    listSongs,
}: {
    type: SelectedSongsType,
    listSongs: SoundFileType[],
}) {
    const dispatch = useDispatch();
    const { checked, onCheck, setListChecked, isCheckedAllFromListChecked, listSelectedItems } = useListChecked(listSongs);
    const { checkAll, isCheckedAll, uncheckAll } = useCheckAll({ isCheckedAllFromListChecked, setListChecked });
    React.useEffect(() => {
        dispatch(setListSelectedSongsAction({
            type,
            listSongs: listSelectedItems,
        }))
    }, [listSelectedItems.length]);

    const isAdded = useIsAddListSelectedSongsSuccessSelector();
    React.useEffect(() => {
        if (isAdded === true) {
            uncheckAll();
            dispatch(clearListSelectedSongsAction())
        }
    }, [isAdded]);

    return (
        <>
            <SongsInPlaylistsScreenCheckAll
                isChecked={isCheckedAll}
                checkAll={checkAll}
            />
            <VirtualizedList
                data={listSongs}
                renderItem={({ item, index, }: { item: SoundFileType, index: number }) => {
                    const check = () => onCheck(index);
                    return (
                        <SongsInPlaylistsScreenSoundAdditionItem
                            key={item.id}
                            item={item}
                            isChecked={checked[index]}
                            onCheck={check}
                        />
                    )
                }}
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

export default SongsInPlaylists;