import React from 'react';
import { SoundPlayerContext } from '@context-api/index';
import { addAudioToPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';

export function useAddLastPlayedAudioToPlaylists() {
    const dispatch = useDispatch();
    const player = React.useContext(SoundPlayerContext);
    React.useEffect(() => {
        if (player.status === 'success') {
            dispatch(addAudioToPlaylistAction({
                type: 'last-played',
                audio: player.currentAudioInfo.originalInfo,
            }))
        }
    }, [player.status]);
}