import { formatTimeString, makeId } from '.';

import { IGenre } from '@interfaces/genres-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { SoundFileType } from 'types/songs-screen-types';
import { avatarHelper } from '@helpers/songs-screen-helpers';

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
            const songs: SoundFileType[] = tracks.map((item: ITrackInfo) => ({
                type: 'other',
                id: item.id ?? makeId(),
                name: item.title ?? '',
                path: item.path ?? '',
                author: item.artist ?? '<unknown>',
                album: item.album ?? '<unknown>',
                albumId: item.albumId,
                genre: item.genre ?? '<unknown>',
                cover: item.cover ?? avatarHelper.getAvatar(),
                duration: formatTimeString(item.duration ? Number(item.duration) : 0),
                other: item.author ?? item.artist ?? item.album ?? item.albumArtist ?? '<unknown>',
                bluredImage: item.blur,
            }));
            resolve({
                listSongs: songs,
                name: genre.name,
                cover: genre.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}