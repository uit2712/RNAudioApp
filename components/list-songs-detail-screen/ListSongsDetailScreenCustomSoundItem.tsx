import { ListSongsDetailType } from 'types/index';
import React from 'react';
import { SoundFileType } from 'types/songs-screen-types';
import SoundItem from '@components/shared/SoundItem';
import { SoundPlayerContext } from '@context-api/index';
import { useGetListMenuSelections } from '@hooks/list-songs-detail-screen-hooks';

function ListSongsDetailScreenCustomSoundItem({
    item,
    index,
    songs,
    type,
}: {
    item: SoundFileType,
    index: number,
    songs: SoundFileType[],
    type: ListSongsDetailType,
}) {
    const player = React.useContext(SoundPlayerContext);
    const listMenuSelections = useGetListMenuSelections({ item, index, songs, type });

    return (
        <SoundItem
            key={item.id}
            value={item}
            isActive={item.id === player.currentAudioInfo.originalInfo.id}
            listMenuSelections={listMenuSelections}
            onPress={() => player.setListSoundsAndPlay(songs, index)}
        />
    )
}

export default ListSongsDetailScreenCustomSoundItem;