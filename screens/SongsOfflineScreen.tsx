import * as React from 'react';

import {
    SectionList,
    SectionListRenderItemInfo,
    StyleSheet,
    Text
} from 'react-native';
import { SongsOfflineSectionItemType, SongsOfflineSectionType } from '../types/songs-offline-screen-types';

import { AlbumItem } from './AlbumsScreen';
import { ArtistItem } from './ArtistsScreen';
import { IAlbum } from '../interfaces/albums-screen-interfaces';
import { IArtist } from '../interfaces/artists-screen-interfaces';
import { Sound } from './SongsScreen';
import { SoundFileType } from '../types/songs-screen-types';
import { SoundPlayerContext } from '../context-api';
import { useGetSearchedAlbumsSelector } from '../store/selectors/albums-screen-selectors';
import { useGetSearchedArtistsSelector } from '../store/selectors/artists-screen-selectors';
import { useGetSearchedSongsSelector } from '../store/selectors/songs-screen-selectors';

function SongsOfflineScreen() {
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
        data: albums,
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

    return (
        <SectionList
            sections={data}
            renderItem={(props) => (
                <SongsOfflineSection {...props} />
            )}
            renderSectionHeader={({ section }) => (
                section.data.length > 0 ? <section.headerComponent/> : null
            )}
        />
    )
}

function SongsOfflineSection({
    item,
    index,
    section
}: SectionListRenderItemInfo<SongsOfflineSectionItemType, SongsOfflineSectionType>) {
    const player = React.useContext(SoundPlayerContext);
    
    switch(section.type) {
        default: return null;
        case 'songs':
            return (
                <Sound
                    index={index}
                    isActive={index === player.currentIndex}
                    value={item as SoundFileType}
                />
            )
        case 'albums':
            return (
                <AlbumItem
                    index={index}
                    value={item as IAlbum}
                />
            )
        case 'artists':
            return (
                <ArtistItem value={item as IArtist}/>
            )
    }
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
})

export default SongsOfflineScreen;