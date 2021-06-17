import { CreationModalContext, SoundPlayerContext } from '@context-api/index';
import { IPlaylist, IRemovePlaylistContext } from '@interfaces/playlists-screen-interfaces';
import { addAudioToPlaylistAction, removePlaylistAction, setPlaylistVisibilityAction } from '@store/actions/playlists-screen-actions';

import { IMenuSelection } from '@interfaces/index';
import React from 'react';
import { RemovePlaylistContext } from '@context-api/playlists-screen-context-api';
import RemovePlaylistWarningModal from '@components/playlists-screen/RemovePlaylistWarningModal';
import { Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useOverlayModal } from '.';

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
    const customPlaylistListMenuSelections = useGetCustomPlaylistListMenuSelections(playlist);

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
                dispatch(setPlaylistVisibilityAction({
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
                dispatch(setPlaylistVisibilityAction({
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

function useGetCustomPlaylistListMenuSelections(playlist: IPlaylist) {
    const { setPlaylist, toggleOverlay } = React.useContext(RemovePlaylistContext);
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Trộn' },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Chia sẻ' },
        { text: 'Thêm bài hát' },
        { text: 'Sửa danh sách phát' },
        {
            text: 'Xóa danh sách phát',
            onSelect: () => {
                setPlaylist(playlist);
                toggleOverlay();
            },
        },
    ];

    return lastPlayedListMenuSelections;
}

export function useRemovePlaylistContext(): IRemovePlaylistContext {
    const { isVisible, toggleOverlay } = useOverlayModal();
    const [playlist, setPlaylist] = React.useState<IPlaylist>();

    return {
        isVisible,
        toggleOverlay,
        playlist,
        setPlaylist,
    }
}