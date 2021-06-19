import * as React from 'react';

import { useAddLastPlayedAudioToPlaylists, useRemovePlaylistContext } from '@hooks/playlists-screen-hooks';

import { DrawerHomeNavigationProp } from '@navigators/config/drawer-home';
import { FlatList, } from 'react-native';
import PlaylistCreation from '@components/playlists-screen/PlaylistCreation';
import PlaylistsItem from '@components/playlists-screen/PlaylistsItem';
import PlaylistsItemMenu from '@components/playlists-screen/PlaylistsItemMenu';
import { RemovePlaylistContext } from '@context-api/playlists-screen-context-api';
import RemovePlaylistWarningModal from '@components/playlists-screen/RemovePlaylistWarningModal';
import { useDrawHomeSettings } from '@hooks/index';
import { useGetVisiblePlaylistsSelector } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/native';

function PlaylistsScreen() {
    const playlists = useGetVisiblePlaylistsSelector();
    const removePlaylistContext = useRemovePlaylistContext();
    useAddLastPlayedAudioToPlaylists();

    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const { setIsShowTabBar } = useDrawHomeSettings();

    return (
        <RemovePlaylistContext.Provider value={removePlaylistContext}>
            <FlatList
                data={playlists}
                style={{
                    paddingHorizontal: 10,
                }}
                renderItem={({ item }) => (
                    <PlaylistsItem
                        key={item.id}
                        value={item}
                        onPress={() => {
                            setIsShowTabBar(false);
                            navigation.navigate('TabListSongs', {
                                screen: 'ListSongs',
                                params: {
                                    type: item.type,
                                    info: {
                                        name: item.name,
                                        cover: item.cover,
                                        listSongs: item.listSongs,
                                    },
                                    isReverseListSongs: true,
                                    playlist: item,
                                }
                            })
                        }}
                    >
                        <PlaylistsItemMenu value={item}/>
                    </PlaylistsItem>
                )}
                keyExtractor={item=> item.id}
            />
            <PlaylistCreation/>
            <RemovePlaylistWarningModal/>
        </RemovePlaylistContext.Provider>
    )
}



export default PlaylistsScreen;