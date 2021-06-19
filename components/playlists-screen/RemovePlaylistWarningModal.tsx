import * as React from 'react';

import { StyleSheet, Text, View, } from 'react-native';

import CustomModal from '@components/shared/CustomModal';
import { IUpdatingModal } from '@interfaces/index';
import { hideUpdatingModal } from '@functions/index';
import { initialStateUpdatingModal } from '@constants/index';
import { updatingModalManager } from '@constants/index';
import { withGlobalModal } from '@hocs/shared/withGlobalModal';

class RemovePlaylistWarningModal extends React.Component<IUpdatingModal> {
    render() {
        const { isVisible, onConfirm, title, cancelLabel, confirmLabel, } = this.props;

        return (
            <CustomModal
                cancelLabel={cancelLabel}
                confirmLabel={confirmLabel}
                onCancel={hideUpdatingModal}
                onConfirm={() => onConfirm(null, hideUpdatingModal)}
                isVisible={isVisible}
                title={title}
            >
                <View style={styles.modalInput}>
                    <Text style={{ fontSize: 16, }}>Bạn có chắc muốn xóa danh sách phát được chọn?</Text>
                </View>
            </CustomModal>
        )
    }
}

const styles = StyleSheet.create({
    modalInput: {
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
    },
});

export default withGlobalModal(RemovePlaylistWarningModal, updatingModalManager, initialStateUpdatingModal);