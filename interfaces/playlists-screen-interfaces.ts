import { PlaylistType } from 'types/playlists-screen-types';
import { SoundFileType } from 'types/songs-screen-types';
import { Source } from 'react-native-fast-image';

export interface IPlaylist {
    id: string;
    type: PlaylistType;
    name: string;
    cover: Source | number;
    shadowColor: string;
    listSongs: SoundFileType[];
    isHidden?: boolean;
}

export interface IRemovePlaylistContext {
    isVisible: boolean;
    playlist?: IPlaylist;
    toggleOverlay: () => void;
    setPlaylist: (value?: IPlaylist) => void;
}