import * as React from 'react';

import { StyleSheet, Text, View, } from 'react-native';

import CustomModal from '@components/shared/CustomModal';
import { RemovePlaylistContext } from '@context-api/playlists-screen-context-api';
import { removePlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function RemovePlaylistWarningModal() {
    const dispatch = useDispatch();
    const { isVisible, playlist, setPlaylist, toggleOverlay } = React.useContext(RemovePlaylistContext);

    const onConfirm = () => {
        if (playlist) {
            dispatch(removePlaylistAction(playlist.id));
            setPlaylist();
        }
    };

    if (!playlist) {
        return null;
    }

    return (
        <CustomModal
            cancelLabel='Hủy'
            confirmLabel='Xóa'
            onCancel={toggleOverlay}
            onConfirm={onConfirm}
            isVisible={isVisible}
            title={`Xóa danh sách ${playlist.name}`}
        >
            <View style={styles.modalInput}>
                <Text style={{ fontSize: 16, }}>Bạn có chắc muốn xóa danh sách phát được chọn?</Text>
            </View>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    modalInput: {
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
    },
});

export default RemovePlaylistWarningModal;