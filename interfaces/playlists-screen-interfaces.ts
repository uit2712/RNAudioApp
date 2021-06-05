import { SoundFileType } from '../hooks';

export type PlaylistType = 'last-played' | 'most-played' | 'favorite';
export interface IPlaylist {
    type: PlaylistType;
    name: string;
    listSongs: SoundFileType[];
}