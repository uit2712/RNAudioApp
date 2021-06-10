import { IAppBundleSoundFile, IDirectorySoundFile, IOtherSoundFile } from '@interfaces/songs-screen-interfaces';

export type SoundFileType = IAppBundleSoundFile | IOtherSoundFile | IDirectorySoundFile;
export type SortSongByPropertyType = 'date' | 'name' | 'album' | 'artist' | 'duration' | 'size';