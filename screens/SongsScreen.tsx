import * as React from 'react';

import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { SoundPlayerContext, } from '@context-api/index';
import { VirtualizedList, } from 'react-native';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';

function SoundsScreen() {
    const player = React.useContext(SoundPlayerContext);
    const { songs } = useGetAllSongsSelector();
    
    return (
        <VirtualizedList
            data={songs}
            renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                <SoundItem
                    key={item.id}
                    value={item}
                    isActive={index === player.currentIndex}
                    listMenuSelections={[
                        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
                        { text: 'Thêm vào hàng đợi' },
                        { text: 'Thêm vào danh sách phát' },
                        { text: 'Thêm vào Mục ưa thích' },
                        { text: 'Đặt làm nhạc chuông' },
                        { text: 'Xóa' },
                    ]}
                    onPress={() => player.setListSoundsAndPlay(songs, index)}
                />
            )}
            keyExtractor={item => item.path.toString()}
            initialNumToRender={7} // Reduce initial render amount
            getItemCount={(data: SoundFileType[]) => data.length}
            getItem={(data: SoundFileType[], index: number) => data[index]}
        />
    )
}

export default SoundsScreen;