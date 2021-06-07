import * as React from 'react';

import {
    SectionList,
    SectionListRenderItemInfo,
    StyleSheet,
} from 'react-native';
import { SongsOfflineSectionItemType, SongsOfflineSectionType } from '../types/songs-offline-screen-types';

import { AlbumItem } from './AlbumsScreen';
import { ArtistItem } from './ArtistsScreen';
import { IAlbum } from '../interfaces/albums-screen-interfaces';
import { IArtist } from '../interfaces/artists-screen-interfaces';
import { Sound } from './SongsScreen';
import { SoundFileType } from '../types/songs-screen-types';
import { SoundPlayerContext } from '../context-api';
import { useGetSectionsData } from '../hooks/songs-offline-screen-hooks';

function SongsOfflineScreen() {
    const data = useGetSectionsData();

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
                    items={item as IAlbum[]}
                />
            )
        case 'artists':
            return (
                <ArtistItem value={item as IArtist}/>
            )
    }
}

const styles = StyleSheet.create({
})

export default SongsOfflineScreen;