import * as React from 'react';

import { PlaylistsDetailScreenRouteProp } from '@navigators/config/root/home/tab-playlists';
import { Sound } from './SongsScreen';
import { SoundFileType } from 'types/songs-screen-types';
import { SoundPlayerContext } from '@context-api/index';
import { VirtualizedList } from 'react-native';
import { useRoute } from '@react-navigation/core';

function PlaylistsDetailScreen() {
    const route = useRoute<PlaylistsDetailScreenRouteProp>();
    const player = React.useContext(SoundPlayerContext);
    React.useEffect(() => {
        player.setListSounds(route.params.info.listSongs);
    }, [])

    return (
        <VirtualizedList
            data={route.params.info.listSongs}
            renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                <Sound
                    key={item.id}
                    value={item}
                    index={index}
                    isActive={index === player.currentIndex}
                />
            )}
            keyExtractor={item => item.path.toString()}
            initialNumToRender={7} // Reduce initial render amount
            getItemCount={(data: SoundFileType[]) => data.length}
            getItem={(data: SoundFileType[], index: number) => data[index]}
        />
    )
}

export default PlaylistsDetailScreen;