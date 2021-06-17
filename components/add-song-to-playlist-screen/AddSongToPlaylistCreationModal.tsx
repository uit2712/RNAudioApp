import { Text, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { showUpdatingModal } from '@functions/index';
import { useDispatch } from 'react-redux';

function AddSongToPlaylistCreationModal() {
    const dispatch = useDispatch();
    const onConfirm = (name: string, onFinished: () => void) => {
        dispatch(addNewPlaylistAction({
            type: 'custom-playlist',
            name,
        }));
        onFinished();
    };
    const toggleOverlay = () => showUpdatingModal({
        inputLabel: 'Tên',
        title: 'Tạo danh sách mới',
        onConfirm,
        cancelLabel: 'Hủy',
        confirmLabel: 'Xong',
    });

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', padding: 20, }}
            onPress={toggleOverlay}
        >
            <AntDesign
                name='plus'
                size={25}
                style={{
                    flex: 1,
                }}
            />
            <Text style={{ flex: 5, fontSize: 18, }}>Thêm danh sách phát</Text>
        </TouchableOpacity>
    )
}

export default AddSongToPlaylistCreationModal;