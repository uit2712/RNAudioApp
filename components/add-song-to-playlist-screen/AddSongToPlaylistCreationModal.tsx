import { Text, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import CreationModal from '@components/shared/CreationModal';
import { CreationModalContext } from '@context-api/index';
import React from 'react';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function AddSongToPlaylistCreationModal() {
    const { isVisible, toggleOverlay } = React.useContext(CreationModalContext);
    const dispatch = useDispatch();

    return (
        <>
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
            <CreationModal
                isVisible={isVisible}
                inputLabel='Tên'
                title='Tạo danh sách mới'
                toggleOverlay={toggleOverlay}
                onConfirm={(name, onFinished) => {
                    dispatch(addNewPlaylistAction({
                        type: 'custom-playlist',
                        name,
                    }));
                    onFinished();
                }}
            />
        </>
    )
}

export default AddSongToPlaylistCreationModal;