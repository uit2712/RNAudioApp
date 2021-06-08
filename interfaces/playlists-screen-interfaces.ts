import { SoundFileType } from '@types/songs-screen-types';
import { Source } from 'react-native-fast-image';

export type PlaylistType = 'last-played' | 'most-played' | 'favorite';
export interface IPlaylist {
    type: PlaylistType;
    name: string;
    cover: Source | number;
    shadowColor: string;
    listSongs: SoundFileType[];
}