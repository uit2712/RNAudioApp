import { TouchableOpacity, View } from 'react-native';

import { DrawerHomeNavigationProp } from '@navigators/config/drawer-home';
import FastImage from 'react-native-fast-image';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { ListItem } from 'react-native-elements';
import React from 'react';
import SettingsMenu from '@components/shared/SettingsMenu';
import { useDrawHomeSettings } from '@hooks/index';
import { useGetListMenuSelections } from '@hooks/playlists-screen-hooks';
import { useNavigation } from '@react-navigation/native';

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

export default PlaylistsItem;