import CreationModal from '@components/shared/CreationModal';
import { CreationModalContext } from '@context-api/index';
import { FAB } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

function PlaylistCreation() {
    const { isVisible, toggleOverlay } = React.useContext(CreationModalContext);
    const dispatch = useDispatch();

    return (
        <View>
            {
                isVisible === false && (
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
            <CreationModal
                isVisible={isVisible}
                inputLabel='Tên'
                title='Tạo danh sách mới'
                toggleOverlay={toggleOverlay}
                onConfirm={(name, onFinished) => {
                    dispatch(addNewPlaylistAction({
                        type: 'custom-playlist',
                        name,
                    }));
                    onFinished();
                }}
            />
        </View>
    )
}

export default PlaylistCreation;