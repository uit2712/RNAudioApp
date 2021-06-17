import * as React from 'react';

import AlbumItem from '@components/albums-screen/AlbumItem';
import { IAlbum } from '@interfaces/albums-screen-interfaces';
import {
    VirtualizedList,
} from 'react-native';
import { listToMatrix } from '@functions/index';
import { useGetAllAlbumsSelector } from '@store/selectors/albums-screen-selectors';

function AlbumsScreen() {
    const { albums } = useGetAllAlbumsSelector();

    return (
        <VirtualizedList
            data={listToMatrix(albums, 2)}
            style={{
                paddingHorizontal: 10,
                marginTop: 40,
            }}
            renderItem={({ item, index }: { item: IAlbum[], index: number }) => (
                <AlbumItem
                    key={index}
                    items={item}
                />
            )}
            keyExtractor={(items) => items.map(value => value.id).join('')}
            getItemCount={(data: Array<IAlbum[]>) => data.length}
            getItem={(data: Array<IAlbum[]>, index: number) => data[index]}
        />
    )
}

export default AlbumsScreen;