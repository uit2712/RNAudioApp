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
}