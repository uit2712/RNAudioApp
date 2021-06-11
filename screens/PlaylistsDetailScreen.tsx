import * as React from 'react';

import { RefreshControl, VirtualizedList } from 'react-native';

import { PlaylistsDetailScreenRouteProp } from '@navigators/config/root/home/tab-playlists';
import { Sound } from './SongsScreen';
import { SoundFileType } from 'types/songs-screen-types';
import { SoundPlayerContext } from '@context-api/index';
import { useRoute } from '@react-navigation/core';

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function PlaylistsDetailScreen() {
    const route = useRoute<PlaylistsDetailScreenRouteProp>();
    const [songs, setSongs] = React.useState([...route.params.info.listSongs].reverse());
    const player = React.useContext(SoundPlayerContext);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <VirtualizedList
            data={songs}
            renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                <Sound
                    key={item.id}
                    value={item}
                    isActive={index === player.currentIndex}
                    listMenuSelections={[
                        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(songs, index) },
                        { text: 'Thêm vào hàng đợi' },
                        { text: 'Thêm vào danh sách phát' },
                        { text: 'Thêm vào Mục ưa thích' },
                        { text: 'Đặt làm nhạc chuông' },
                    ]}
                    onPress={() => player.setListSoundsAndPlay(songs, index)}
                />
            )}
            keyExtractor={item => item.path.toString()}
            initialNumToRender={7} // Reduce initial render amount
            getItemCount={(data: SoundFileType[]) => data.length}
            getItem={(data: SoundFileType[], index: number) => data[index]}
            refreshControl={
                <RefreshControl
                    colors={["#9Bd35A", "#689F38"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    )
}

export default PlaylistsDetailScreen;