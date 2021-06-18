import { IAlbum } from '@interfaces/albums-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import { mapTrackInfoToSoundFileTypeMemo } from '@functions/index';

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
            resolve({
                listSongs: mapTrackInfoToSoundFileTypeMemo(tracks),
                name: album.album,
                cover: album.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}