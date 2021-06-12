import * as React from 'react';

import {
    SectionList,
    SectionListRenderItemInfo,
    StyleSheet,
} from 'react-native';
import { SongsOfflineSectionItemType, SongsOfflineSectionType } from 'types/songs-offline-screen-types';

import { AlbumItem } from './AlbumsScreen';
import { ArtistItem } from './ArtistsScreen';
import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { SoundPlayerContext } from '@context-api/index';
import { useGetSectionsData } from '@hooks/songs-offline-screen-hooks';

function SongsOfflineScreen() {
    const data = useGetSectionsData();

    return (
        <SectionList
            sections={data}
            renderItem={(props) => (
                <SongsOfflineSection key={props.section.type} {...props} />
            )}
            renderSectionHeader={({ section }) => (
                section.data.length > 0 ? <section.headerComponent/> : null
            )}
            keyExtractor={(item: SongsOfflineSectionItemType, index: number) => `${index}`}
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
                <SoundItem
                    isActive={index === player.currentIndex}
                    value={item as SoundFileType}
                    listMenuSelections={[
                        { text: 'Phát tiếp theo', onSelect: () => player.playAudio(index) },
                        { text: 'Thêm vào hàng đợi' },
                        { text: 'Thêm vào danh sách phát' },
                        { text: 'Thêm vào Mục ưa thích' },
                        { text: 'Đặt làm nhạc chuông' },
                        { text: 'Xóa' },
                    ]}
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