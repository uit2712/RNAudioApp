import { addAudioToPlaylistAction, setPlaylistVisibility } from '@store/actions/playlists-screen-actions';

import { IMenuSelection } from '@interfaces/index';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import React from 'react';
import { SoundPlayerContext } from '@context-api/index';
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
    const lastPlayedListMenuSelections = useGetLastPlayedListMenuSelections(playlist);
    const mostPlayedListMenuSelections = useGetMostPlayedListMenuSelections(playlist);
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

function useGetLastPlayedListMenuSelections(playlist: IPlaylist) {
    const dispatch = useDispatch();
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        {
            text: 'Ẩn danh sách phát',
            onSelect: () => {
                dispatch(setPlaylistVisibility({
                    isHidden: true,
                    listPlaylistIds: [playlist.id],
                }))
            }
        },
        { text: 'Chia sẻ' },
    ];

    return lastPlayedListMenuSelections;
}

function useGetMostPlayedListMenuSelections(playlist: IPlaylist) {
    const dispatch = useDispatch();
    const mostPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        {
            text: 'Ẩn danh sách phát',
            onSelect: () => {
                dispatch(setPlaylistVisibility({
                    isHidden: true,
                    listPlaylistIds: [playlist.id],
                }))
            }
        },
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