import * as React from 'react';

import { Button, FAB, Input, Overlay } from 'react-native-elements';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function PlaylistItemCreation() {
    const [visible, setVisible] = React.useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [input, setInput] = React.useState('');
    const dispatch = useDispatch();

    function addNewPlaylist() {
        dispatch(addNewPlaylistAction({
            type: 'custom-playlist',
            name: input,
        }));
        toggleOverlay();
        setInput('');
    }

    return (
        <View>
            {
                visible === false && (
                    <FAB
                        title='Tạo mới'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                        }}
                        icon={
                            <Ionicons
                                name='add'
                                size={30}
                                color='white'
                            />
                        }
                        onPress={toggleOverlay}
                    />
                )
            }
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View
                        style={styles.modalTitle}
                    >
                        <Text style={styles.modalTitleText}>Tạo danh sách mới</Text>
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
                        <Text style={{ fontSize: 18, }}>Tên:</Text>
                        <Input
                            autoFocus={true}
                            inputStyle={{
                                height: 15,
                            }}
                            value={input}
                            onChangeText={setInput}
                        />
                    </View>
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
                                title='Hủy'
                                titleStyle={{
                                    color: 'rgb(66, 76, 177)',
                                }}
                                buttonStyle={{
                                    borderColor: 'black',
                                }}
                                onPress={toggleOverlay}
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
                                title='Thêm mới'
                                buttonStyle={{
                                    backgroundColor: 'rgb(66, 76, 177)',
                                }}
                                disabled={input.trim() === ''}
                                onPress={addNewPlaylist}
                            />
                        </View>
                    </View>
                </View>
            </Overlay>
        </View>
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
    modalActions: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    modalActionsContainer: {
        flex: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})

export default PlaylistItemCreation;