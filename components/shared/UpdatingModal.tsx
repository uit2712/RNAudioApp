import * as React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { initialStateUpdatingModal, updatingModalManager } from '@constants/index';

import CustomModal from './CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { IUpdatingModal, } from '@interfaces/index';
import { Input, } from 'react-native-elements';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { hideUpdatingModal } from '@functions/index';
import { withGlobalModal } from '@hocs/shared/withGlobalModal';

class UpdatingModal extends React.Component<IUpdatingModal> {
    state ={
        input: '',
    }

    onFinished = () => {
        hideUpdatingModal();
        this.setState({
            input: '',
        });
    }

    render() {
        const { isVisible, inputLabel, onConfirm, title, cancelLabel, confirmLabel, } = this.props;
        const input = this.state.input;

        return (
            <CustomModal
                onCancel={this.onFinished}
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

export default withGlobalModal(UpdatingModal, updatingModalManager, initialStateUpdatingModal);