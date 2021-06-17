import * as React from 'react';

import { FAB, ListItem } from 'react-native-elements';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useAddLastPlayedAudioToPlaylists, useGetListMenuSelections } from '@hooks/playlists-screen-hooks';

import CreationModal from '@common/components/CreationModal';
import { CreationModalContext } from '@context-api/index';
import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import FastImage from 'react-native-fast-image';
import { IMenuSelection } from '@interfaces/index';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsMenu from '@common/components/SettingsMenu';
import { addNewPlaylistAction } from '@store/actions/playlists-screen-actions';
import { useDispatch } from 'react-redux';
import { useDrawHomeSettings } from '@hooks/index';
import { useGetPlaylistsSelector } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/core';

function PlaylistsScreen() {
    const playlists = useGetPlaylistsSelector();
    useAddLastPlayedAudioToPlaylists();

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
                    />
                )}
                keyExtractor={item=> item.id}
            />
            <PlaylistCreation/>
        </>
    )
}

function PlaylistCreation() {
    const { isVisible, toggleOverlay } = React.useContext(CreationModalContext);
    const dispatch = useDispatch();

    return (
        <View>
            {
                isVisible === false && (
                    <FAB
                        title='Tạo mới'
                        style={{
                            position: 'absolute',
                            margin: 16,
                            right: 0,
                            bottom: 0,
                        }}
                        icon={
                            <Ionicons
                                name='add'
                                size={30}
                                color='white'
                            />
                        }
                        onPress={toggleOverlay}
                    />
                )
            }
            <CreationModal
                isVisible={isVisible}
                inputLabel='Tên'
                title='Tạo danh sách mới'
                toggleOverlay={toggleOverlay}
                onConfirm={(name, onFinished) => {
                    dispatch(addNewPlaylistAction({
                        type: 'custom-playlist',
                        name,
                    }));
                    onFinished();
                }}
            />
        </View>
    )
}

function PlaylistsItem({
    value,
}: {
    value: IPlaylist,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const { setIsShowTabBar } = useDrawHomeSettings();

    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={() => {
                setIsShowTabBar(false);
                navigation.navigate('TabListSongs', {
                    screen: 'ListSongs',
                    params: {
                        type: value.type,
                        info: {
                            name: value.name,
                            cover: value.cover,
                            listSongs: value.listSongs,
                        },
                        isReverseListSongs: true,
                        playlist: value,
                    }
                })
            }}
            style={{
                width: '100%',
            }}
            bottomDivider
        >
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: value.shadowColor,
                    left: 48,
                    width: 90,
                    height: 90,
                    borderRadius: 45,
                }}
            />
            <FastImage
                style={{ width: 100, height: 100, borderRadius: 50, }}
                source={value.cover}
                resizeMode={FastImage.resizeMode.cover}
            />
            <ListItem.Content>
                <ListItem.Title>{value.name}</ListItem.Title>
            </ListItem.Content>
            <PlaylistsItemMenu value={value}/>
        </ListItem>
    )
}

function PlaylistsItemMenu({
    value,
}: {
    value: IPlaylist,
}) {
    const listMenuSelections = useGetListMenuSelections({ playlist: value });

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={value.name}
        />
    )
}

export default PlaylistsScreen;