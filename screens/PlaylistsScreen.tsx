import * as React from 'react';

import { FlatList, TouchableOpacity, View } from 'react-native';

import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import FastImage from 'react-native-fast-image';
import { IMenuSelection } from '@interfaces/index';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { ListItem } from 'react-native-elements';
import SettingsMenu from '@common/components/SettingsMenu';
import { useAddLastPlayedAudioToPlaylists } from '@hooks/playlists-screen-hooks';
import { useDrawHomeSettings } from '@hooks/index';
import { useGetPlaylists } from '@store/selectors/playlists-screen-selectors';
import { useNavigation } from '@react-navigation/core';

function PlaylistsScreen() {
    const playlists = useGetPlaylists();
    useAddLastPlayedAudioToPlaylists();

    return (
        <FlatList
            data={playlists}
            style={{
                paddingHorizontal: 10,
            }}
            renderItem={({ item }) => (
                <PlaylistsItem
                    key={item.type}
                    value={item}
                />
            )}
            keyExtractor={item => item.type}
        />
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
                        title: value.name,
                        info: value,
                        isReverseListSongs: true,
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
            <PlaylistsItemMenu name={value.name}/>
        </ListItem>
    )
}

function PlaylistsItemMenu({
    name,
}: {
    name: string,
}) {
    const listMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Trộn' },
        { text: 'Ẩn danh sách phát' },
        { text: 'Chia sẻ' },
    ]

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={name}
        />
    )
}

export default PlaylistsScreen;