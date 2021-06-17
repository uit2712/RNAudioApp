import { isUpdatingModalVisible, showUpdatingModal } from '@functions/index';

import { FAB } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function PlaylistCreation() {
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
        <View>
            {
                isUpdatingModalVisible() === false && (
                    <FAB
                        title='Tạo mới'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                        }}
                        icon={
                            <Ionicons
                                name='add'
                                size={30}
                                color='white'
                            />
                        }
                        onPress={toggleOverlay}
                    />
                )
            }
        </View>
    )
}

export default PlaylistCreation;