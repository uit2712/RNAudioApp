import * as React from 'react';

import {
    SectionList,
    SectionListRenderItemInfo,
    StyleSheet,
} from 'react-native';
import { SongsOfflineSectionItemType, SongsOfflineSectionType } from 'types/songs-offline-screen-types';

import AlbumItem from '@components/albums-screen/AlbumItem';
import ArtistItem from '@components/artists-screen/ArtistItem';
import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@common/components/SoundItem';
import { SoundPlayerContext } from '@context-api/index';
import { useFavorite } from '@hooks/index';
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

const SongsOfflineSection = React.memo(function({
    item,
    index,
    section,
    separators,
}: SectionListRenderItemInfo<SongsOfflineSectionItemType, SongsOfflineSectionType>) {
    
    switch(section.type) {
        default: return null;
        case 'songs':
            return (
                <SongsOfflineSectionSoundItem
                    index={index}
                    item={item}
                    section={section}
                    separators={separators}
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
});

const SongsOfflineSectionSoundItem = React.memo(function({
    item,
    index,
    section
}: SectionListRenderItemInfo<SongsOfflineSectionItemType, SongsOfflineSectionType>) {
    const player = React.useContext(SoundPlayerContext);
    const audio = item as SoundFileType;
    const { isFavorite, onFavoritePress, } = useFavorite(audio);

    return (
        <SoundItem
            isActive={audio.id === player.currentAudioInfo.originalInfo.id}
            value={audio}
            listMenuSelections={[
                { text: 'Phát tiếp theo', onSelect: () => player.setListSoundsAndPlay(section.data as SoundFileType[], index) },
                { text: 'Thêm vào hàng đợi' },
                { text: 'Thêm vào danh sách phát' },
                { text: isFavorite ? 'Xóa khỏi Mục yêu thích' : 'Thêm vào Mục ưa thích', onSelect: onFavoritePress },
                { text: 'Đặt làm nhạc chuông' },
                { text: 'Xóa' },
            ]}
            onPress={() => player.setListSoundsAndPlay(section.data as SoundFileType[], index)}
        />
    )
})

const styles = StyleSheet.create({
})

export default React.memo(SongsOfflineScreen);