import * as React from 'react';

import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { SoundPlayerContext, } from '@context-api/index';
import { VirtualizedList, } from 'react-native';
import { navigateToAddToPlaylistScreen } from '@functions/index';
import { useFavorite } from '@hooks/index';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';

function SoundsScreen() {
    const { songs } = useGetAllSongsSelector();
    
    return (
        <VirtualizedList
            data={songs}
            renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                <SoundsScreenCustomSoundItem
                    key={item.id}
                    index={index}
                    item={item}
                    songs={songs}
                />
            )}
            keyExtractor={item => item.path.toString()}
            initialNumToRender={7} // Reduce initial render amount
            getItemCount={(data: SoundFileType[]) => data.length}
            getItem={(data: SoundFileType[], index: number) => data[index]}
        />
    )
}

function SoundsScreenCustomSoundItem({
    item,
    index,
    songs,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
}) {
    const player = React.useContext(SoundPlayerContext);
    const { isFavorite, onFavoritePress } = useFavorite(item);
    return (
        <SoundItem
            key={item.id}
            value={item}
            isActive={item.id === player.currentAudioInfo.originalInfo.id}
            listMenuSelections={[
                { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
                { text: 'Thêm vào hàng đợi' },
                {
                    text: 'Thêm vào danh sách phát',
                    onSelect: () => navigateToAddToPlaylistScreen(item),
                },
                { text: isFavorite ? 'Xóa khỏi Mục ưa thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
                { text: 'Đặt làm nhạc chuông' },
                { text: 'Xóa' },
            ]}
            onPress={() => player.setListSoundsAndPlay(songs, index)}
        />
    )
}

export default SoundsScreen;