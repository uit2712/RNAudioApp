import * as React from 'react';

import { IShowUpdatingModal, IUpdatingModal, IUpdatingModalRef } from '@interfaces/index';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomModal from './CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { Input, } from 'react-native-elements';
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
            <CustomModal
                onCancel={this.onFinished}
                toggleOverlay={toggleOverlay}
                cancelLabel={cancelLabel}
                confirmLabel={confirmLabel}
                isVisible={isVisible}
                onConfirm={() => onConfirm(input, this.onFinished)}
                title={title}
                isDisableButtonConfirm={input?.trim() === ''}
            >
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
            </CustomModal>
        )
    }
}

const styles = StyleSheet.create({
    modalCover: {
        width: ScreenWidth * 0.4,
        height: ScreenWidth * 0.4,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    modalInput: {
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center',
    },
});

export default UpdatingModal;