import * as React from 'react';

import { DrawerHomeNavigationProp } from '@navigators/config/drawer-home';
import { FlatList, } from 'react-native';
import PlaylistCreation from '@components/playlists-screen/PlaylistCreation';
import PlaylistsItem from '@components/playlists-screen/PlaylistsItem';
import PlaylistsItemMenu from '@components/playlists-screen/PlaylistsItemMenu';
import RemovePlaylistWarningModal from '@components/playlists-screen/RemovePlaylistWarningModal';
import { useAddLastPlayedAudioToPlaylists, } from '@hooks/playlists-screen-hooks';
import { useDrawHomeSettings } from '@hooks/index';
import { useGetVisiblePlaylistsSelector } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/native';
import { withProfilerHOF } from '@hocs/shared/withProfiler';

function PlaylistsScreen() {
    const playlists = useGetVisiblePlaylistsSelector();
    useAddLastPlayedAudioToPlaylists();

    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const { setIsShowTabBar } = useDrawHomeSettings();

    return (
        <>
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
        </>
    )
}

export default withProfilerHOF(PlaylistsScreen, 'PlaylistsScreen');