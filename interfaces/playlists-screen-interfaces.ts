import { Source } from 'react-native-fast-image';
import { SoundFileType } from '../hooks';

export type PlaylistType = 'last-played' | 'most-played' | 'favorite';
export interface IPlaylist {
    type: PlaylistType;
    name: string;
    cover: Source | number;
    shadowColor: string;
    listSongs: SoundFileType[];
}