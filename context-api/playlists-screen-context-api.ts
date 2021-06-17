import { IPlaylist, IRemovePlaylistContext } from '@interfaces/playlists-screen-interfaces';

import React from 'react';

export const RemovePlaylistContext = React.createContext<IRemovePlaylistContext>({
    isVisible: false,
    toggleOverlay: () => {},
    setPlaylist: (value?: IPlaylist) => {},
});