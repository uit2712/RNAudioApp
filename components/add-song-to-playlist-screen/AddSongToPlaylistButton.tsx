import { useNavigation, useRoute } from '@react-navigation/native';

import { AddSongToPlaylistScreenRouteProp } from '@navigators/config/drawer-home/tab-others';
import { FAB } from 'react-native-elements';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { addListAudioToPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function AddSongToPlaylistButton({
    listSelectedItems,
}: {
    listSelectedItems: IPlaylist[],
}) {
    const route = useRoute<AddSongToPlaylistScreenRouteProp>();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const addSongToPlaylists = () => {
        listSelectedItems.forEach(playlist => {
            dispatch(addListAudioToPlaylistAction({
                playlistId: playlist.id,
                listAudio: [route.params.sound],
            }));
        });
        ToastAndroid.show(`${listSelectedItems.length} bài hát được thêm vào danh sách thành công`, ToastAndroid.SHORT);
        navigation.goBack();
    }

    return (
        <FAB
            title='Thêm vào danh sách phát'
            style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
            }}
            color='#FF5733'
            onPress={addSongToPlaylists}
            disabled={listSelectedItems.length === 0}
        />
    )
}

export default AddSongToPlaylistButton;