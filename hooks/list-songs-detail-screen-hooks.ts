import { IMenuSelection } from '@interfaces/index';
import { ListSongsDetailNavigationProp, } from '@navigators/config/root/home/tab-list-songs-detail';
import { ListSongsDetailType } from 'types/index';
import React from 'react';
import { SoundFileType } from 'types/songs-screen-types';
import { SoundPlayerContext } from '@context-api/index';
import { navigateToAddToPlaylistScreen } from '@functions/index';
import { useFavorite } from '.';
import { useGetPlaylistByTypeSelector } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/native';

export function useGetListMenuSelections({
    item,
    index,
    songs,
    type,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
    type: ListSongsDetailType,
}) {
    const lastPlayedListMenuSelections = useGetLastPlayedListMenuSelections({ item, index, songs });
    const mostPlayedListMenuSelections = useGetMostPlayedListMenuSelections({ item, index, songs });
    const favoriteListMenuSelections = useGetFavoriteListMenuSelections({ item, index, songs });
    const otherListMenuSelections = useGetOtherListMenuSelections({ item, index, songs });
    const customPlaylistListMenuSelections = useGetCustomPlaylistListMenuSelections({ item, index, songs });

    switch(type) {
        default: return otherListMenuSelections;
        case 'favorite': return favoriteListMenuSelections;
        case 'last-played': return lastPlayedListMenuSelections;
        case 'most-played': return mostPlayedListMenuSelections;
        case 'custom-playlist': return customPlaylistListMenuSelections;
    }
}

function useGetLastPlayedListMenuSelections({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress, } = useFavorite(item);
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
        { text: 'Thêm vào hàng đợi' },
        { text: isFavorite ? 'Xóa khỏi Mục yêu thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
        { text: 'Biết lời bài hát' },
        { text: 'Chia sẻ' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Đặt làm nhạc chuông' },
    ];

    return lastPlayedListMenuSelections;
}

function useGetMostPlayedListMenuSelections({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress, } = useFavorite(item);
    const mostPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
        { text: 'Thêm vào hàng đợi' },
        { text: isFavorite ? 'Xóa khỏi mục yêu thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
        { text: 'Biết lời bài hát' },
        { text: 'Chia sẻ' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Đặt làm nhạc chuông' },
    ]

    return mostPlayedListMenuSelections;
}

function useGetFavoriteListMenuSelections({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const navigation = useNavigation<ListSongsDetailNavigationProp>();
    const player = React.useContext(SoundPlayerContext);
    const { removeFromPlayList } = useFavorite(item);
    const info = useGetPlaylistByTypeSelector('favorite');
    const favoriteListMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Biết lời bài hát' },
        { text: 'Chia sẻ' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Đặt làm nhạc chuông' },
        {
            text: 'Xóa khỏi danh sách phát',
            onSelect: () => {
                removeFromPlayList();
                navigation.setParams({
                    info,
                })
            }
        },
    ]

    return favoriteListMenuSelections;
}

function useGetOtherListMenuSelections({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress, } = useFavorite(item);
    const otherListMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Thêm vào danh sách phát', onSelect: () => navigateToAddToPlaylistScreen(item), },
        { text: isFavorite ? 'Xóa khỏi mục yêu thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
        { text: 'Biết lời bài hát' },
        { text: 'Chia sẻ' },
        { text: 'Chỉnh sửa thẻ' },
    ]

    return otherListMenuSelections;
}

function useGetCustomPlaylistListMenuSelections({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress, } = useFavorite(item);
    const lastPlayedListMenuSelections: IMenuSelection[] = [
        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
        { text: 'Thêm vào hàng đợi' },
        { text: isFavorite ? 'Xóa khỏi Mục yêu thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
        { text: 'Biết lời bài hát' },
        { text: 'Chia sẻ' },
        { text: 'Chỉnh sửa thẻ' },
        { text: 'Đặt làm nhạc chuông' },
    ];

    return lastPlayedListMenuSelections;
}