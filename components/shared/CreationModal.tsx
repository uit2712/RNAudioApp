import * as React from 'react';

import { Input, Overlay } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ButtonsModal from '@components/shared/ButtonsModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

function CreationModal({
    title,
    inputLabel,
    onConfirm,
    isVisible,
    toggleOverlay,
}: {
    title: string,
    inputLabel: string,
    onConfirm: (name: string, onFinished: () => void) => void,
    isVisible: boolean,
    toggleOverlay: () => void,
}) {
    const [input, setInput] = React.useState('');

    function addNewPlaylist() {
        onConfirm(input, onFinished);
    }

    const onFinished = () => {
        toggleOverlay();
        setInput('');
    }

    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={toggleOverlay}
            transparent={true}
        >
            <View style={styles.modal}>
                <View
                    style={styles.modalTitle}
                >
                    <Text style={styles.modalTitleText}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.modalCover}>
                    <Entypo
                        name='camera'
                        color='gray'
                        size={75}
                        style={{
                            textAlign: 'center',
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.modalInput}>
                    <Text style={{ fontSize: 18, }}>{inputLabel}</Text>
                    <Input
                        autoFocus={true}
                        inputStyle={{
                            height: 15,
                        }}
                        value={input}
                        onChangeText={setInput}
                    />
                </View>
                <ButtonsModal
                    cancelLabel='Hủy'
                    confirmLabel='Thêm mới'
                    onCancel={onFinished}
                    onConfirm={addNewPlaylist}
                    isDisabledConfirmButton={input.trim() === ''}
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

export default CreationModal;