import * as React from 'react';

import { IShowUpdatingModal, IUpdatingModal, IUpdatingModalRef } from '@interfaces/index';
import { Input, Overlay } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ButtonsModal from './ButtonsModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import modalManager from '@helpers/modal-helper';

const initialState: IUpdatingModal = {
    isVisible: false,
    inputLabel: '',
    title: '',
    onConfirm: (param: any, onFinish: () => void) => {},
    cancelLabel: '',
    confirmLabel: '',
    input: '',
};
class UpdatingModal extends React.Component<{}, IUpdatingModal> {
    readonly current: IUpdatingModalRef = this;
    
    state = {
        ...initialState,
    }
    
    componentDidMount() {
        modalManager.register(this);
    }

    componentWillUnmount() {
        modalManager.unregister(this);
    }

    showModal({ inputLabel, onConfirm, title, cancelLabel, confirmLabel, input }: IShowUpdatingModal) {
        this.setState({
            inputLabel,
            isVisible: true,
            onConfirm,
            title,
            cancelLabel,
            confirmLabel,
            input: input ?? '',
        });
    }

    hideModal() {
        this.setState({
            ...initialState,
        })
    }

    onFinished = () => {
        this.setState({
            input: '',
            isVisible: false,
        });
    }

    isVisible = () => this.state.isVisible;

    render() {
        const { isVisible, input, inputLabel, onConfirm, title, cancelLabel, confirmLabel, } = this.state;
        const toggleOverlay = () => this.setState({ isVisible: !isVisible });

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
                            onChangeText={(input: string) => this.setState({ input })}
                        />
                    </View>
                    <ButtonsModal
                        cancelLabel={cancelLabel}
                        confirmLabel={confirmLabel}
                        onCancel={this.onFinished}
                        onConfirm={() => onConfirm(input, this.onFinished)}
                        isDisabledConfirmButton={input?.trim() === ''}
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

export default UpdatingModal;