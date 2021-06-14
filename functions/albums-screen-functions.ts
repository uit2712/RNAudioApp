import { formatTimeString, makeId } from '@functions/index';

import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { SoundFileType } from 'types/songs-screen-types';
import { avatarHelper } from '@helpers/songs-screen-helpers';

export function getAllAlbums() {
    return new Promise((resolve: (value: IAlbum[]) => void, reject: (value?: Error) => void) => {
        MusicFiles.getAlbums()
            .then((result: IAlbum[]) => {
                const albums = result.map(item => ({
                    ...item,
                    numberOfSongs: Number(item.numberOfSongs),
                    cover: avatarHelper.getAvatar(),
                }));
                resolve(albums);
            }).catch((error: Error) => {
                reject(error);
            });
    });
}

export function getListSongsByAlbumId(album?: IAlbum): Promise<IListSongsDetail> {
    return new Promise((resolve: (value: IListSongsDetail) => void, reject: (value?: Error) => void) => {
        if (!album) {
            reject();
            return;
        }

        MusicFiles.getListSongs({
            albumId: album.id,
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
                name: album.album,
                cover: album.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}