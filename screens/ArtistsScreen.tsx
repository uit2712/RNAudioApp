import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { MenuOption } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomMenu from '../common/components/CustomMenu';
import { avatarHelper } from '../helpers/songs-screen-helpers';
import { IArtist, useGetAllArtists } from '../hooks';
import { IMenuSelection } from '../interfaces';

function ArtistsScreen() {
    const { artists } = useGetAllArtists();
    console.log(artists?.length);

    return (
        <FlatList
            data={artists}
            style={{
                paddingHorizontal: 10,
                marginTop: 40,
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

function ArtistItem({
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
        <CustomMenu
            listMenuSelections={listMenuSelections}
            triggerComponent={() => (
                <MaterialCommunityIcons
                    name='dots-vertical-circle'
                    size={30}
                />
            )}
            headerComponent={() => (
                <MenuOption
                    text={name}
                    disabled
                    customStyles={{
                        optionText: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    }}
                />
            )}
        />
    )
}

export default ArtistsScreen;