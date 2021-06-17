import * as React from 'react';

import { useFocusScreen, useListChecked } from '@hooks/index';

import AddSongToPlaylistButton from '@components/add-song-to-playlist-screen/AddSongToPlaylistButton';
import AddSongToPlaylistCreationModal from '@components/add-song-to-playlist-screen/AddSongToPlaylistCreationModal';
import AddSongToPlaylistItem from '@components/add-song-to-playlist-screen/AddSongToPlaylistItem';
import { AddSongToPlaylistScreenRouteProp } from '@navigators/config/root/home/tab-others';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { VirtualizedList } from 'react-native';
import { useGetPlaylistsNotContainAudioSelector, } from '@store/selectors/playlists-screen-selectors';
import { useRoute } from '@react-navigation/native';

function AddSongToPlaylistScreen() {
    const route = useRoute<AddSongToPlaylistScreenRouteProp>();
    const playlists = useGetPlaylistsNotContainAudioSelector(route.params.sound.id);
    const { checked, onCheck, listSelectedItems, reset, } = useListChecked(playlists);
    useFocusScreen(reset);

    React.useEffect(() => {
        if (playlists.length > 0) {
            onCheck(playlists.length - 1);
        }
    }, [playlists.length]);
    
    return (
        <>
            <AddSongToPlaylistCreationModal/>
            <VirtualizedList
                data={playlists}
                renderItem={({ item, index }: { item: IPlaylist, index: number }) => {
                    const check = () => onCheck(index);
                    
                    return (
                        <AddSongToPlaylistItem
                            key={item.id}
                            value={item}
                            isChecked={checked[index]}
                            onCheck={check}
                        />
                    )
                }}
                keyExtractor={(item: IPlaylist, index) => item.id + index}
                getItemCount={(data: IPlaylist[]) => data.length}
                getItem={(data: IPlaylist[], index: number) => data[index]}
            />
            <AddSongToPlaylistButton listSelectedItems={listSelectedItems}/>
        </>
    )
}

export default AddSongToPlaylistScreen;