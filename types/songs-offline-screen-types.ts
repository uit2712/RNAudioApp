import { IAlbum } from '../interfaces/albums-screen-interfaces';
import { IArtist } from '../interfaces/artists-screen-interfaces';
import { SoundFileType } from './songs-screen-types';

export type SongsOfflineSectionItemType = SoundFileType | IAlbum | IArtist;
export type SongsOfflineSectionType = {
    type: 'songs';
    data: SongsOfflineSectionItemType[];
    headerComponent: React.ComponentType<any>;
} | {
    type: 'albums';
    data: SongsOfflineSectionItemType[];
    headerComponent: React.ComponentType<any>;
} | {
    type: 'artists';
    data: SongsOfflineSectionItemType[];
    headerComponent: React.ComponentType<any>;
}