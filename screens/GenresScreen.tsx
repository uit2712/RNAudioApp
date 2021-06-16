import * as React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { createGenre, getListSongsByGenre } from '@functions/genres-screen-functions';
import { useGenreIsShouldRefreshSelector, useGetListGenresSelector } from '@store/selectors/genres-screen-selectors';

import CreationModal from '@common/components/CreationModal';
import { CreationModalContext } from '@context-api/index';
import { IGenre } from '@interfaces/genres-screen-interfaces';
import { RootNavigationProp } from '@navigators/config/root';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { listToMatrix } from '@functions/index';
import { setGenreIsShouldRefreshAction } from '@store/actions/genres-screen-actions';
import { useDisabledButton } from '@hooks/index';
import { useDispatch } from 'react-redux';
import { useGetAllGenres } from '@hooks/genres-screen-hooks';
import { useNavigation, } from '@react-navigation/native';

function GenresScreen() {
    const { genres } = useGetListGenresSelector();
    const isShouldRefresh = useGenreIsShouldRefreshSelector();
    const { refresh, } = useGetAllGenres(true);
    React.useEffect(() => {
        if (isShouldRefresh) {
            refresh();
        }
    }, [isShouldRefresh]);

    return (
        <>
            <GenreCreation/>
            <VirtualizedList
                data={listToMatrix(genres, 2)}
                renderItem={({ item, index }: { item: IGenre[], index: number }) => (
                    <GenreItem
                        key={index}
                        items={item}
                    />
                )}
                keyExtractor={(items) => items.map(value => value.id).join('')}
                getItemCount={(data: Array<IGenre[]>) => data.length}
                getItem={(data: Array<IGenre[]>, index: number) => data[index]}
            />
        </>
    )
}

function GenreCreation() {
    const dispatch = useDispatch();
    const { isVisible, toggleOverlay } = React.useContext(CreationModalContext);

    return (
        <CreationModal
            isVisible={isVisible}
            toggleOverlay={toggleOverlay}
            inputLabel='Tên'
            title='Tạo thể loại mới'
            onConfirm={(name: string, onFinished: () => void) => {
                createGenre(name).then(() => {
                    onFinished();
                    dispatch(setGenreIsShouldRefreshAction(true));
                }).catch(console.log)
            }}
        />
    )
}

export function GenreItem({
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

export default GenresScreen;