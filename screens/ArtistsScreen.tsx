import * as React from 'react';

import ArtistItem from '@components/artists-screen/ArtistItem';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { VirtualizedList } from 'react-native';
import { useGetAllArtistsSelector } from '@store/selectors/artists-screen-selectors';

function ArtistsScreen() {
    const { artists } = useGetAllArtistsSelector();

    return (
        <VirtualizedList
            data={artists}
            style={{
                paddingHorizontal: 10,
            }}
            renderItem={({ item }: { item: IArtist }) => (
                <ArtistItem
                    key={item.id}
                    value={item}
                />
            )}
            keyExtractor={(item: IArtist, index) => item.id + index}
            getItemCount={(data: IArtist[]) => data.length}
            getItem={(data: IArtist[], index: number) => data[index]}
        />
    )
}



export default ArtistsScreen;