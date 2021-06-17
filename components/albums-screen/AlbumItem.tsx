import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomMenu from '@common/components/CustomMenu';
import { DrawerHomeNavigationProp } from '@navigators/config/root/home';
import Entypo from 'react-native-vector-icons/Entypo';
import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IMenuSelection } from '@interfaces/index';
import { MenuOption } from 'react-native-popup-menu';
import React from 'react';
import { getListSongsByAlbumId } from '@functions/albums-screen-functions';
import { useDisabledButton } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';

export function AlbumItem({
    items,
}: {
    items: IAlbum[],
}) {
    return (
        <View style={styles.albumItem}>
            {
                items.map((item: IAlbum, index: number) => (
                    <AlbumItemColumn
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))
            }
        </View>
    )
}

function AlbumItemColumn({
    item,
    index,
}: {
    item: IAlbum,
    index: number,
}) {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const { disable, enable, isDisabled } = useDisabledButton();
    async function onPress() {
        disable();
        const info = await getListSongsByAlbumId(item);
        enable();
        navigation.navigate('TabListSongs', {
            screen: 'ListSongs',
            params: {
                type: 'album',
                info,
            }
        });
    }

    return (
        <TouchableOpacity
            style={[styles.albumItemColumn, { marginRight: index === 0 ? 10 : 0, }]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <View style={styles.albumItemColumnRect}/>
            <View style={styles.albumItemColumnCoverContainer}>
                <Image
                    source={{
                        uri: item.cover,
                    }}
                    style={styles.albumItemColumnCoverContainerSource}
                />
            </View>
            <View style={styles.albumItemColumnInfo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{item.album}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, }}>
                    <Text style={{ flex: 0.5, textAlign: 'left', }}>{item.numberOfSongs} bài hát</Text>
                    <View style={{ flex: 0.5, alignItems: 'flex-end', }}>
                        <AlbumItemColumnMenu name={item.album}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function AlbumItemColumnMenu({
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

const styles = StyleSheet.create({
    albumItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    albumItemColumn: {
        flex: 0.5,
        height: 215,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        position: 'relative',
    },
    albumItemColumnRect: {
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
    },
    albumItemColumnCoverContainer: {
        width: 160,
        height: 160,
        position: 'absolute',
        top: 0,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    albumItemColumnCoverContainerSource: {
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    albumItemColumnInfo: {
        position: 'absolute',
        bottom: 0,
        height: 150,
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        opacity: 0.5,
    }
})

export default AlbumItem;