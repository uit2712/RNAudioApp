import * as React from 'react';

import { DrawerHomeContext, SoundPlayerContext } from '@context-api/index';
import { RefreshControl, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { useHomeBottomTabHelper, useRefresh } from '@hooks/index';

import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import { FAB } from 'react-native-elements';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { ListSongsDetailScreenRouteProp } from '@navigators/config/root/home/tab-list-songs-detail';
import { ListSongsDetailType } from 'types/index';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { useGetListMenuSelections, } from '@hooks/list-songs-detail-screen-hooks';
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
            {
                route.params.type === 'custom-playlist' && (
                    <FAB
                        title='Thêm bài hát'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                        }}
                        icon={
                            <Ionicons
                                name='add'
                                size={30}
                                color='white'
                            />
                        }
                        onPress={() => {
                            navigation.navigate('TabSongsAddition', {
                                screen: 'SongAddition',
                                params: {
                                    screen: 'All',
                                    params: {
                                        playlist: route.params.playlist,
                                    }
                                }
                            })
                        }}
                    />
                )
            }
        </>
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

function ListSongsDetailScreenEmptyPlaylist({
    type,
    playlist,
}: {
    type: ListSongsDetailType,
    playlist?: IPlaylist,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const currentPlaylist = useGetPlaylistByIdSelector(playlist?.id ?? '');


    if (!currentPlaylist || type !== 'custom-playlist') {
        return (
            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Fontisto
                    name='applemusic'
                    size={50}
                    style={{
                        marginBottom: 10,
                    }}
                />
                <Text>Không tìm thấy bài hát nào</Text>
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 18, marginBottom: 10, }}>Không có bài hát nào trong danh sách phát</Text>
            <TouchableOpacity
                style={{ width: '80%', marginBottom: 10, }}
                onPress={() => {
                    navigation.navigate('TabSongsAddition', {
                        screen: 'SongAddition',
                        params: {
                            screen: 'All',
                            params: {
                                playlist,
                            }
                        }
                    })
                }}
            >
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>
                        Thêm bài hát
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

export default ListSongsDetailScreen;