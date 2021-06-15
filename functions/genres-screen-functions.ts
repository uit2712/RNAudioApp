import { IGenre } from '@interfaces/genres-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
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