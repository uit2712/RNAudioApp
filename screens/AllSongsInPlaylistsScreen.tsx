import * as React from 'react';

import { Text, View, VirtualizedList } from 'react-native';
import { useCheckAll, useListChecked } from '@hooks/index';

import { AllSongsInPlaylistsScreenRouteProp } from '@navigators/config/root/home/tab-songs-addition/tab-songs-in-playlists';
import { CheckBox } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SoundAdditionItem from '@common/components/SoundAdditionItem';
import { SoundFileType } from 'types/songs-screen-types';
import { setPlaylistSongsShouldBeAddedAction } from '@store/actions/tab-songs-addition-actions';
import { useDispatch } from 'react-redux';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';
import { useRoute } from '@react-navigation/native';

function AllSongsInPlaylistsScreen() {
    const route = useRoute<AllSongsInPlaylistsScreenRouteProp>();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setPlaylistSongsShouldBeAddedAction(route.params?.playlist));
    }, []);
    const { songs } = useGetAllSongsSelector();
    const { checked, onCheck, setListChecked, isCheckedAllFromListChecked } = useListChecked(songs);
    const { checkAll, isCheckedAll } = useCheckAll({ isCheckedAllFromListChecked, setListChecked });

    return (
        <>
            <AllSongsInPlaylistsScreenCheckAll
                isChecked={isCheckedAll}
                checkAll={checkAll}
            />
            <VirtualizedList
                data={songs}
                renderItem={({ item, index, }: { item: SoundFileType, index: number }) => {
                    const check = () => onCheck(index);
                    return (
                        <AllSongsInPlaylistsScreenSoundAdditionItemMemo
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

function AllSongsInPlaylistsScreenCheckAll({
    isChecked,
    checkAll,
}: {
    isChecked: boolean,
    checkAll: () => void,
}) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={{ flex: 0.5, marginLeft: 15, }}>
                <Text style={{ fontSize: 18, }}>Chọn tất cả</Text>
            </View>
            <View style={{ flex: 0.5, marginRight: 15,  }}>
                <CheckBox
                    right
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
                    onPress={checkAll}
                />
            </View>
        </View>
    )
}

class AllSongsInPlaylistsScreenSoundAdditionItem extends React.Component<{
    item: SoundFileType,
    onCheck?: () => void,
    isChecked: boolean,
}> {
    shouldComponentUpdate(nextProps: {
        item: SoundFileType,
        onCheck?: () => void,
        isChecked: boolean,
    }) {
        const isShouldUpdate = nextProps.item.id === this.props.item.id && nextProps.isChecked !== this.props.isChecked;
        return isShouldUpdate;
    }

    render() {
        return (
            <SoundAdditionItem
                item={this.props.item}
                onCheck={this.props.onCheck}
                isChecked={this.props.isChecked}
            />
        )
    }
}

const AllSongsInPlaylistsScreenSoundAdditionItemMemo = React.memo(AllSongsInPlaylistsScreenSoundAdditionItem);
export default AllSongsInPlaylistsScreen;