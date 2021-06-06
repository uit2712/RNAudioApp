import * as React from 'react';
import {
    Text,
    SectionList,
    SectionListRenderItemInfo,
    StyleSheet
} from 'react-native';
import { SoundPlayerContext } from '../context-api';
import { IAlbum, SoundFileType, useGetAllAlbums } from '../hooks';
import { AlbumItem } from './AlbumsScreen';
import { Sound } from './SongsScreen';

type SongsOfflineSectionItemType = SoundFileType | IAlbum;
type SongsOfflineSectionType = {
    type: 'songs';
    data: SongsOfflineSectionItemType[];
    headerComponent: React.ComponentType<any>;
} | {
    type: 'albums';
    data: SongsOfflineSectionItemType[];
    headerComponent: React.ComponentType<any>;
}

function SongsOfflineScreen() {
    const player = React.useContext(SoundPlayerContext);
    const { albums } = useGetAllAlbums();
    const data: SongsOfflineSectionType[] = [{
        type: 'songs',
        data: player.listSounds,
        headerComponent: () => (
            <Text style={styles.sectionTitle}>Bài hát</Text>
        )
    }, {
        type: 'albums',
        data: albums,
        headerComponent: () => (
            <Text style={styles.sectionTitle}>Albums</Text>
        )
    }];

    return (
        <SectionList
            sections={data}
            renderItem={(props) => (
                <SongsOfflineSection {...props} />
            )}
            renderSectionHeader={({ section }) => (
                <section.headerComponent/>
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