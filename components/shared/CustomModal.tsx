import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import ButtonsModal from './ButtonsModal';
import { ICustomModal, } from '@interfaces/index';
import { Overlay } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

class CustomModal extends React.PureComponent<ICustomModal> {
    render() {
        const {
            isVisible,
            title,
            cancelLabel,
            confirmLabel,
            onConfirm,
            onCancel,
            isDisableButtonConfirm
        } = this.props;

        return (
            <Overlay
                isVisible={isVisible}
                onBackdropPress={onCancel}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View
                        style={styles.modalTitle}
                    >
                        <Text style={styles.modalTitleText}>{title}</Text>
                    </View>
                    {this.props.children}
                    <ButtonsModal
                        cancelLabel={cancelLabel}
                        confirmLabel={confirmLabel}
                        onCancel={onCancel}
                        onConfirm={onConfirm}
                        isDisabledConfirmButton={isDisableButtonConfirm}
                    />
                </View>
            </Overlay>
        )
    }
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
    modalTitleText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
});

export default CustomModal;