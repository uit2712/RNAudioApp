import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import SettingsMenu from '../common/components/SettingsMenu';
import { IArtist, useGetAllArtists } from '../hooks';
import { IMenuSelection } from '../interfaces';

function ArtistsScreen() {
    const { artists } = useGetAllArtists();

    return (
        <FlatList
            data={artists}
            style={{
                paddingHorizontal: 10,
            }}
            renderItem={({ item }) => (
                <ArtistItem
                    key={item.id}
                    value={item}
                />
            )}
            keyExtractor={(item, index) => item.id + index}
        />
    )
}

export function ArtistItem({
    value,
}: {
    value: IArtist,
}) {
    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={() => {}}
            style={{
                width: '100%',
            }}
            bottomDivider
        >
            <FastImage
                style={{ width: 50, height: 50, borderRadius: 10, }}
                source={{
                    uri: value.cover,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <ListItem.Content>
                <ListItem.Title>{value.artist}</ListItem.Title>
                <ListItem.Subtitle>{value.numberOfSongs} Bài hát</ListItem.Subtitle>
            </ListItem.Content>
            <ArtistItemMenu name={value.artist}/>
        </ListItem>
    )
}

function ArtistItemMenu({
    name,
}: {
    name: string,
}) {
    const listMenuSelections: IMenuSelection[] = [
        { text: 'Phát', },
        { text: 'Phát tiếp theo', },
        { text: 'Trộn' },
        { text: 'Thêm vào hàng đợi' },
        { text: 'Thêm vào danh sách phát' },
        { text: 'Ghim Nghệ sĩ' },
        { text: 'Chia sẻ' },
    ]

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={name}
        />
    )
}

export default ArtistsScreen;