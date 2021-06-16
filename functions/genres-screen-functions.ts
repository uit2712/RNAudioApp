import { IGenre } from '@interfaces/genres-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import { mapTrackInfoToSoundFileType } from '.';

export function getAllGenres(): Promise<IGenre[]> {
    return new Promise((resolve: (value: IGenre[]) => void, reject: (value?: Error) => void) => {
        MusicFiles.getGenres().then((genres: IGenre[]) => {
            resolve(genres.map(item => ({
                ...item,
                cover: avatarHelper.getAvatar(),
            })));
        }).catch((error: Error) => {
            reject(error);
        });
    });
}

export function getListSongsByGenre(genre?: IGenre): Promise<IListSongsDetail> {
    return new Promise((resolve: (value: IListSongsDetail) => void, reject: (value?: Error) => void) => {
        if (!genre) {
            reject();
            return;
        }

        MusicFiles.getListSongs({
            genreId: genre.id,
        }).then((tracks: ITrackInfo[]) => {
            resolve({
                listSongs: mapTrackInfoToSoundFileType(tracks),
                name: genre.name,
                cover: genre.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}

export function createGenre(name: string) {
    return new Promise((resolve: (value?: any) => void, reject: (value?: Error) => void) => {
        if (!name) {
            reject();
            return;
        }

        MusicFiles.createGenre({
            name,
        }).then(() => {
            resolve();
        }).catch((error: Error) => {
            console.log(error);
            reject(error);
        });
    });
}