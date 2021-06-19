import { TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import { ListItem } from 'react-native-elements';
import React from 'react';

function PlaylistsItem({
    value,
    onPress,
    children,
}: {
    value: IPlaylist,
    onPress: () => void,
    children?: React.ReactNode,
}) {
    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={onPress}
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
            {children}
        </ListItem>
    )
}

export default PlaylistsItem;