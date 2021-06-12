import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext } from '@context-api/index';
import { RefreshControl, VirtualizedList } from 'react-native';

import { ListSongsDetailScreenRouteProp } from '@navigators/config/root/home/tab-list-songs-detail';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { useHomeBottomTabHelper } from '@hooks/index';
import { useRoute } from '@react-navigation/core';

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function ListSongsDetailScreen() {
    const route = useRoute<ListSongsDetailScreenRouteProp>();
    const player = React.useContext(SoundPlayerContext);

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
                <SoundItem
                    key={item.id}
                    value={item}
                    isActive={index === player.currentIndex}
                    listMenuSelections={[
                        { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(route.params.info.listSongs, index) },
                        { text: 'Thêm vào hàng đợi' },
                        { text: 'Thêm vào danh sách phát' },
                        { text: 'Thêm vào Mục ưa thích' },
                        { text: 'Đặt làm nhạc chuông' },
                    ]}
                    onPress={() => player.setListSoundsAndPlay(route.params.info.listSongs, index)}
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

export default ListSongsDetailScreen;