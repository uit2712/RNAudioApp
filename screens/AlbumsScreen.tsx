import * as React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuOption } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomMenu from '../common/components/CustomMenu';
import { avatarHelper } from '../helpers/songs-screen-helpers';
import { IAlbum, useGetAllAlbums } from '../hooks';
import { IMenuSelection } from '../interfaces';

function AlbumsScreen() {
    const { albums } = useGetAllAlbums();

    return (
        <FlatList
            data={albums}
            numColumns={2}
            style={{
                paddingHorizontal: 10,
                marginTop: 40,
            }}
            renderItem={({ item, index }) => (
                <AlbumItem
                    key={index}
                    value={item}
                    index={index}
                />
            )}
            keyExtractor={(item, index) => item.id + index}
        />
    )
}

function AlbumItem({
    value,
    index,
}: {
    value: IAlbum,
    index: number,
}) {
    return (
        <View
            style={{
                flex: 0.5,
                height: 215,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                marginRight: index % 2 === 0 ? 10 : 0,
                marginBottom: 10,
                position: 'relative',
            }}
        >
            <View
                style={{
                    width: 160,
                    height: 160,
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'gray',
                    opacity: 0.2,
                    borderRadius: 5,
                }}
            />
            <View
                style={{
                    width: 160,
                    height: 160,
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                }}
            >
                <Image
                    source={{
                        uri: avatarHelper.getAvatar(),
                    }}
                    width={150}
                    height={150}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 5,
                    }}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 150,
                    width: '100%',
                    backgroundColor: 'gray',
                    borderRadius: 5,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    opacity: 0.5,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{value.album}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, }}>
                    <Text style={{ flex: 0.5, textAlign: 'left', }}>{value.numberOfSongs} bài hát</Text>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', }}>
                        <AlbumItemMenu name={value.album}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

function AlbumItemMenu({
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
        { text: 'Ghim Album' },
        { text: 'Ẩn Album' },
        { text: 'Chia sẻ' },
    ]

    return (
        <CustomMenu
            listMenuSelections={listMenuSelections}
            triggerComponent={() => (
                <TouchableOpacity>
                    <Entypo
                        name='dots-three-horizontal'
                        size={30}
                    />
                </TouchableOpacity>
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

export default AlbumsScreen;