import * as React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { AvatarHelper } from '../helpers/songs-screen-helpers';
import { IAlbum, useGetAllAlbums } from '../hooks';

function AlbumsScreen() {
    const { albums } = useGetAllAlbums();
    console.log(albums);

    return (
        <FlatList
            data={[...albums, ...albums, ...albums]}
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
    const avatarHelper = new AvatarHelper();

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
                        uri: value.cover ?? avatarHelper.getAvatar(),
                    }}
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
                        <TouchableOpacity>
                            <Entypo
                                name='dots-three-horizontal'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AlbumsScreen;