import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IGenre } from '@interfaces/genres-screen-interfaces';
import React from 'react';
import { RootNavigationProp } from '@navigators/config/root';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { getListSongsByGenre } from '@functions/genres-screen-functions';
import { useDisabledButton } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';

function GenreItem({
    items,
}: {
    items: IGenre[],
}) {
    return (
        <View style={styles.genreItem}>
            {
                items.map((item: IGenre, index: number) => (
                    <GenreItemColumn
                        key={item.id}
                        item={item}
                        index={index}
                    />
                ))
            }
        </View>
    )
}


// error: can go back from ListSongsDetailScreen to GenresScreen
function GenreItemColumn({
    item,
    index,
}: {
    item: IGenre,
    index: number,
}) {
    const navigation = useNavigation<RootNavigationProp>();
    const { disable, enable, isDisabled } = useDisabledButton();
    function onPress() {
        disable();
        getListSongsByGenre(item).then((info) => {
            enable();
            navigation.navigate('Home', {
                screen: 'TabListSongs',
                params: {
                    screen: 'ListSongs',
                    params: {
                        type: 'genre',
                        info,
                    },
                }
            });
        }).catch(() => {
            enable();
        });
    }

    return (
        <TouchableOpacity
            style={styles.genreItemColumn}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Image
                source={{
                    uri: item.cover,
                }}
                style={styles.genreItemColumnCover}
            />
            <Text style={styles.genreItemColumnName}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    genreItem: {
        flex: 1,
        flexDirection: 'row',
    },
    genreItemColumn: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    genreItemColumnCover: {
        width: ScreenWidth / 2 - 15,
        height: ScreenWidth / 2 - 15,
        borderRadius: 10,
    },
    genreItemColumnName: {
        position: 'absolute',
        bottom: 10,
        zIndex: 1,
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: 'white',
    },
});

export default GenreItem;