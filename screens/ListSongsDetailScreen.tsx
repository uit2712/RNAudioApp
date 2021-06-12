import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext } from '@context-api/index';
import { RefreshControl, VirtualizedList } from 'react-native';

import { ListSongsDetailScreenRouteProp } from '@navigators/config/root/home/tab-list-songs-detail';
import { ListSongsDetailType } from 'types/index';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { useGetListMenuSelections, } from '@hooks/list-songs-detail-screen-hooks';
import { useHomeBottomTabHelper } from '@hooks/index';
import { useRoute } from '@react-navigation/core';

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function ListSongsDetailScreen() {
    const route = useRoute<ListSongsDetailScreenRouteProp>();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const { setIsShowTabBar, } = React.useContext(DrawerHomeContext);
    useHomeBottomTabHelper({
        onBack: () => setIsShowTabBar(true),
        onFocus: () => setIsShowTabBar(false)
    });

    return (
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
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    )
}

function ListSongsDetailScreenCustomSoundItem({
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
    const player = React.useContext(SoundPlayerContext);
    const listMenuSelections = useGetListMenuSelections({ item, index, songs, type });

    return (
        <SoundItem
            key={item.id}
            value={item}
            isActive={item.id === player.currentAudioInfo.originalInfo.id}
            listMenuSelections={listMenuSelections}
            onPress={() => player.setListSoundsAndPlay(songs, index)}
        />
    )
}

export default ListSongsDetailScreen;