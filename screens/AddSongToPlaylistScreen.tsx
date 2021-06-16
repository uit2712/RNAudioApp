import * as React from 'react';

import { CheckBox, FAB, ListItem } from 'react-native-elements';
import { Text, ToastAndroid, TouchableOpacity, VirtualizedList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AddSongToPlaylistScreenRouteProp } from '@navigators/config/root/home/tab-others';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addListAudioToPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetPlaylistsNotContainAudioSelector, } from '@store/selectors/playlists-screen-selectors';
import { useListChecked } from '@hooks/index';

function AddSongToPlaylistScreen() {
    const route = useRoute<AddSongToPlaylistScreenRouteProp>();
    const playlists = useGetPlaylistsNotContainAudioSelector(route.params.sound.id);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { checked, onCheck, listSelectedItems, reset, } = useListChecked(playlists);

    const addSongToPlaylists = () => {
        listSelectedItems.forEach(playlist => {
            dispatch(addListAudioToPlaylistAction({
                playlistId: playlist.id,
                listAudio: [route.params.sound],
            }));
        });
        reset();
        ToastAndroid.show(`${listSelectedItems.length} bài hát được thêm vào danh sách thành công`, ToastAndroid.SHORT);
        navigation.goBack();
    }
    
    return (
        <>
            <TouchableOpacity style={{ flexDirection: 'row', padding: 20, }}>
                <AntDesign
                    name='plus'
                    size={25}
                    style={{
                        flex: 1,
                    }}
                />
                <Text style={{ flex: 5, fontSize: 18, }}>Thêm danh sách phát</Text>
            </TouchableOpacity>
            <VirtualizedList
                data={playlists}
                renderItem={({ item, index }: { item: IPlaylist, index: number }) => {
                    const check = () => onCheck(index);
                    
                    return (
                        <AddSongToPlaylistItem
                            key={item.id}
                            value={item}
                            isChecked={checked[index]}
                            onCheck={check}
                        />
                    )
                }}
                keyExtractor={(item: IPlaylist, index) => item.id + index}
                getItemCount={(data: IPlaylist[]) => data.length}
                getItem={(data: IPlaylist[], index: number) => data[index]}
            />
            <FAB
                title='Thêm vào danh sách phát'
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                }}
                onPress={addSongToPlaylists}
                disabled={listSelectedItems.length === 0}
            />
        </>
    )
}

class AddSongToPlaylistItem extends React.Component<{
    value: IPlaylist,
    onCheck?: () => void,
    isChecked: boolean,
}> {
    shouldComponentUpdate(nextProps: {
        value: IPlaylist,
        onCheck?: () => void,
        isChecked: boolean,
    }) {
        const isShouldUpdate = nextProps.value.id === this.props.value.id && nextProps.isChecked !== this.props.isChecked;
        return isShouldUpdate;
    }

    render() {
        return (
            <ListItem
                Component={TouchableOpacity}
                onPress={this.props.onCheck}
                style={{
                    width: '100%',
                }}
                bottomDivider
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
                    checked={this.props.isChecked}
                    onPress={() => this.props.onCheck && this.props.onCheck()}
                />
                <FastImage
                    style={{ width: 50, height: 50, borderRadius: 25, }}
                    source={this.props.value.cover}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <ListItem.Content>
                    <ListItem.Title>{this.props.value.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }
}

export default AddSongToPlaylistScreen;