import { StyleSheet, Text } from 'react-native';

import React from 'react';
import { SongsOfflineSectionType } from '../types/songs-offline-screen-types';
import { listToMatrix } from '@functions/index';
import { useGetSearchedAlbumsSelector } from '../store/selectors/albums-screen-selectors';
import { useGetSearchedArtistsSelector } from '../store/selectors/artists-screen-selectors';
import { useGetSearchedSongsSelector } from '../store/selectors/songs-screen-selectors';

export function useGetSectionsData() {
    const songs = useGetSearchedSongsSelector();
    const albums = useGetSearchedAlbumsSelector();
    const artists = useGetSearchedArtistsSelector();
    const data: SongsOfflineSectionType[] = [{
        type: 'songs',
        data: songs,
        headerComponent: () => (
            <Text style={styles.sectionTitle}>Bài hát</Text>
        )
    }, {
        type: 'albums',
        data: listToMatrix(albums, 2),
        headerComponent: () => (
            <Text style={styles.sectionTitle}>Albums</Text>
        )
    }, {
        type: 'artists',
        data: artists,
        headerComponent: () => (
            <Text style={styles.sectionTitle}>Nghệ sĩ</Text>
        )
    }];

    return data;
}

const styles = StyleSheet.create({
    sectionTitle: {
        height: 50,
        backgroundColor: 'black',
        color: 'darkorange',
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        fontSize: 20,
    }
});