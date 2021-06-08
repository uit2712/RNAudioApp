import { IAlbum } from '@interfaces/albums-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
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
    })
}