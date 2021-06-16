import React from 'react';
import SoundAdditionItem from './SoundAdditionItem';
import { SoundFileType } from 'types/songs-screen-types';

class SongsInPlaylistsScreenSoundAdditionItem extends React.Component<{
    item: SoundFileType,
    onCheck?: () => void,
    isChecked: boolean,
    isDisabled?: boolean,
}> {
    shouldComponentUpdate(nextProps: {
        item: SoundFileType,
        onCheck?: () => void,
        isChecked: boolean,
    }) {
        const isShouldUpdate = nextProps.item.id === this.props.item.id && nextProps.isChecked !== this.props.isChecked;
        return isShouldUpdate;
    }

    render() {
        return (
            <SoundAdditionItem
                item={this.props.item}
                onCheck={this.props.onCheck}
                isChecked={this.props.isChecked}
                isDisabled={this.props.isDisabled}
            />
        )
    }
}

export default React.memo(SongsInPlaylistsScreenSoundAdditionItem);