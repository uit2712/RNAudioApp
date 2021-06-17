import * as React from 'react';

import { useGenreIsShouldRefreshSelector, useGetListGenresSelector } from '@store/selectors/genres-screen-selectors';

import GenreCreation from '@components/genres-screen/GenreCreation';
import GenreItem from '@components/genres-screen/GenreItem';
import { IGenre } from '@interfaces/genres-screen-interfaces';
import { VirtualizedList } from 'react-native';
import { listToMatrix } from '@functions/index';
import { useGetAllGenres } from '@hooks/genres-screen-hooks';

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

export default GenresScreen;