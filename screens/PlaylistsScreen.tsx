import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { MenuOption } from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomMenu from '../common/components/CustomMenu';
import { IMenuSelection } from '../interfaces';
import { IPlaylist } from '../interfaces/playlists-screen-interfaces';
import { useGetPlaylists } from '../store/selectors/playlists-screen-selectors';

function PlaylistsScreen() {
    const playlists = useGetPlaylists();
    console.log(playlists);
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
    return (
        <ListItem
            Component={TouchableOpacity}
            onPress={() => {}}
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

export default PlaylistsScreen;