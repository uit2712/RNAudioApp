import * as React from 'react';

import { StyleSheet, Text, View, } from 'react-native';

import ButtonsModal from '@common/components/ButtonsModal';
import { Overlay } from 'react-native-elements';
import { RemovePlaylistContext } from '@context-api/playlists-screen-context-api';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
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
        <Overlay isVisible={isVisible}>
            <View style={styles.modal}>
                <View
                    style={styles.modalTitle}
                >
                    <Text style={styles.modalTitleText}>Xóa danh sách <Text style={{ fontWeight: 'bold' }}>{playlist.name}</Text></Text>
                </View>
                <View style={styles.modalInput}>
                    <Text style={{ fontSize: 16, }}>Bạn có chắc muốn xóa danh sách phát được chọn?</Text>
                </View>
                <ButtonsModal
                    cancelLabel='Hủy'
                    confirmLabel='Xóa'
                    onCancel={toggleOverlay}
                    onConfirm={onConfirm}
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: ScreenWidth * 0.8,
        borderRadius: 15,
    },
    modalTitle: {
        backgroundColor: 'rgb(66, 76, 177)',
        marginTop: -10,
        marginHorizontal: -10,
        paddingVertical: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 10,
    },
    modalCover: {
        width: ScreenWidth * 0.4,
        height: ScreenWidth * 0.4,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    modalTitleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    modalInput: {
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
    },
});

export default RemovePlaylistWarningModal;