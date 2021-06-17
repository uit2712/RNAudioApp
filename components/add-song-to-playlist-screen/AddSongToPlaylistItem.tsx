import { CheckBox, ListItem } from 'react-native-elements';

import FastImage from 'react-native-fast-image';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

class AddSongToPlaylistItem extends React.Component<{
    value: IPlaylist,
    onCheck?: () => void,
    isChecked: boolean,
}> {
    shouldComponentUpdate(nextProps: {
        value: IPlaylist,
        onCheck?: () => void,
        isChecked: boolean,
    }) {
        const isShouldUpdate = nextProps.value.id === this.props.value.id && nextProps.isChecked !== this.props.isChecked;
        return isShouldUpdate;
    }

    render() {
        return (
            <ListItem
                Component={TouchableOpacity}
                onPress={this.props.onCheck}
                style={{
                    width: '100%',
                }}
                bottomDivider
            >
                <CheckBox
                    center
                    checkedIcon={
                        <MaterialIcons
                            name='check-box'
                            size={30}
                            color='#FF5733'
                        />
                    }
                    uncheckedIcon={
                        <MaterialIcons
                            name='check-box-outline-blank'
                            size={30}
                            color='#FF5733'
                        />
                    }
                    checked={this.props.isChecked}
                    onPress={() => this.props.onCheck && this.props.onCheck()}
                />
                <FastImage
                    style={{ width: 50, height: 50, borderRadius: 25, }}
                    source={this.props.value.cover}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <ListItem.Content>
                    <ListItem.Title>{this.props.value.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        )
    }
}

export default AddSongToPlaylistItem;