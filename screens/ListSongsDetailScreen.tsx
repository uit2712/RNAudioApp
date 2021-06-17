import * as React from 'react';

import { RefreshControl, VirtualizedList } from 'react-native';
import { useHomeBottomTabHelper, useRefresh } from '@hooks/index';

import CustomListButtonAdd from '@components/list-songs-detail-screen/CustomListButtonAdd';
import { DrawerHomeContext, } from '@context-api/index';
import { DrawerHomeNavigationProp } from '@navigators/config/drawer-home';
import ListSongsDetailScreenCustomSoundItem from '@components/list-songs-detail-screen/ListSongsDetailScreenCustomSoundItem';
import ListSongsDetailScreenEmptyPlaylist from '@components/list-songs-detail-screen/ListSongsDetailScreenEmptyPlaylist';
import { ListSongsDetailScreenRouteProp } from '@navigators/config/drawer-home/tab-list-songs-detail';
import { SoundFileType } from 'types/songs-screen-types';
import { useGetPlaylistByIdSelector } from '@store/selectors/playlists-screen-selectors';
import { useIsAddListSelectedSongsSuccessSelector } from '@store/selectors/tab-songs-addition-selectors';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';

function ListSongsDetailScreen() {
    const route = useRoute<ListSongsDetailScreenRouteProp>();
    const navigation = useNavigation<DrawerHomeNavigationProp>();

    const newPlaylist = useGetPlaylistByIdSelector(route.params.playlist?.id ?? '');

    const { isRefresh, setIsRefresh, onRefresh } = useRefresh(() => {
        if (newPlaylist) {
            navigation.setParams({
                ...route.params,
                info: {
                    ...route.params.info,
                    name: newPlaylist.name,
                    listSongs: newPlaylist.listSongs,
                }
            })
        }
    });

    const { setIsShowTabBar, } = React.useContext(DrawerHomeContext);
    useHomeBottomTabHelper({
        onBack: () => setIsShowTabBar(true),
        onFocus: () => setIsShowTabBar(false)
    });

    const isAdded = useIsAddListSelectedSongsSuccessSelector();
    React.useEffect(() => {
        if (isAdded) {
            setIsRefresh(true);
        }
    }, [isAdded]);

    if (route.params.info.listSongs.length === 0) {
        return (
            <ListSongsDetailScreenEmptyPlaylist
                type={route.params.type}
                playlist={route.params.playlist}
            />
        )
    }

    return (
        <>
            <VirtualizedList
                data={route.params.info.listSongs}
                renderItem={({ item, index }: { item: SoundFileType, index: number }) => (
                    <ListSongsDetailScreenCustomSoundItem
                        key={item.id}
                        index={index}
                        item={item}
                        songs={route.params.info.listSongs}
                        type={route.params.type}
                    />
                )}
                keyExtractor={item => item.path.toString()}
                initialNumToRender={7} // Reduce initial render amount
                getItemCount={(data: SoundFileType[]) => data.length}
                getItem={(data: SoundFileType[], index: number) => data[index]}
                refreshControl={
                    <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={isRefresh}
                        onRefresh={onRefresh}
                    />
                }
            />
            <CustomListButtonAdd
                type={route.params.type}
                playlist={route.params.playlist}
            />
        </>
    )
}

export default ListSongsDetailScreen;