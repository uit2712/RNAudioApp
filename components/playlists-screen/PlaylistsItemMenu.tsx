import { IPlaylist } from '@interfaces/playlists-screen-interfaces';
import React from 'react';
import SettingsMenu from '@components/shared/SettingsMenu';
import { useGetListMenuSelections } from '@hooks/playlists-screen-hooks';

function PlaylistsItemMenu({
    value,
}: {
    value: IPlaylist,
}) {
    const listMenuSelections = useGetListMenuSelections({ playlist: value });

    return (
        <SettingsMenu
            listMenuSelections={listMenuSelections}
            title={value.name}
        />
    )
}

export default PlaylistsItemMenu;