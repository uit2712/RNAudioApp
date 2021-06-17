import { IMenuSelection } from '@interfaces/index';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
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

export function useGetListMenuSelections({
    playlist,
}: {
    playlist: IPlaylist,
}) {
    const lastPlayedListMenuSelections = useGetLastPlayedListMenuSelections();
    const mostPlayedListMenuSelections = useGetMostPlayedListMenuSelections();
    const favoriteListMenuSelections = useGetFavoriteListMenuSelections();
    const customPlaylistListMenuSelections = useGetCustomPlaylistListMenuSelections();

    switch(playlist.type) {
        default: return [];
        case 'favorite': return favoriteListMenuSelections;
        case 'last-played': return lastPlayedListMenuSelections;
        case 'most-played': return mostPlayedListMenuSelections;
        case 'custom-playlist': return customPlaylistListMenuSelections;
    }
}

function useGetLastPlayedListMenuSelections() {
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        { text: 'Ẩn danh sách phát' },
        { text: 'Chia sẻ' },
    ];

    return lastPlayedListMenuSelections;
}

function useGetMostPlayedListMenuSelections() {
    const mostPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        { text: 'Ẩn danh sách phát' },
        { text: 'Chia sẻ' },
    ];

    return mostPlayedListMenuSelections;
}

function useGetFavoriteListMenuSelections() {
    const favoriteListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        { text: 'Chia sẻ' },
    ];

    return favoriteListMenuSelections;
}

function useGetCustomPlaylistListMenuSelections() {
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Trộn' },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Chia sẻ' },
        { text: 'Thêm bài hát' },
        { text: 'Sửa danh sách phát' },
        { text: 'Xóa danh sách phát' },
    ];

    return lastPlayedListMenuSelections;
}