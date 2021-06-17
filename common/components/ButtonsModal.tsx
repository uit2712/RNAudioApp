import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

function ButtonsModal({
    onConfirm,
    onCancel,
    confirmLabel,
    cancelLabel,
    isDisabledConfirmButton,
}: {
    onConfirm: () => void,
    onCancel: () => void,
    confirmLabel: string,
    cancelLabel: string,
    isDisabledConfirmButton?: boolean,
}) {
    return (
        <View style={styles.modalActions}>
            <View style={styles.modalActionsContainer}>
                <Button
                    type='outline'
                    icon={
                        <AntDesign
                            name='close'
                            size={15}
                            style={{ marginRight: 10, }}
                            color='rgb(66, 76, 177)'
                        />
                    }
                    title={cancelLabel}
                    titleStyle={{
                        color: 'rgb(66, 76, 177)',
                    }}
                    buttonStyle={{
                        borderColor: 'black',
                    }}
                    onPress={onCancel}
                />
            </View>
            <View style={styles.modalActionsContainer}>
                <Button
                    icon={
                        <Feather
                            name='check'
                            size={15}
                            style={{ marginRight: 10, }}
                            color='white'
                        />
                    }
                    title={confirmLabel}
                    buttonStyle={{
                        backgroundColor: 'rgb(66, 76, 177)',
                    }}
                    onPress={onConfirm}
                    disabled={isDisabledConfirmButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalActions: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    modalActionsContainer: {
        flex: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default ButtonsModal;