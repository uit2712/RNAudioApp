export interface ITrackInfo {
    id?: string;
    title?: string;
    artist?: string;
    album?: string;
    genre?: string;
    duration?: string; // miliseconds
    cover?: string;
    blur?: string;
    path?: string;
    displayName?: string;
    fileName?: string;
    albumArtist?: string;
    author?: string;
    coverTemp?: string;
    albumId?: string;
    artistId?: string;
}

export interface ISoundFile {
    id?: string;
    name: string;
    artist?: string;
    album?: string;
    genre?: string;
    cover?: string;
    duration?: string;
    other: string; // author => artist => album => albumArtist
    bluredImage?: string;
    coverTemp?: string;
    albumId?: string;
    artistId?: string;
}

export interface IAppBundleSoundFile extends ISoundFile {
    type: 'app-bundle';
    path: string;
    basePath: string;
}

export interface IOtherSoundFile extends ISoundFile {
    type: 'other';
    path: string;
}

export interface IDirectorySoundFile extends ISoundFile {
    type: 'directory'
    path: NodeRequire;
}