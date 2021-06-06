import MusicFiles from 'react-native-get-music-files';
import { avatarHelper } from '../helpers/songs-screen-helpers';
import { IArtist } from '../interfaces/artists-screen-interfaces';

export function getAllArtists() {
    return new Promise((resolve: (value: IArtist[]) => void, reject) => {
        MusicFiles.getArtists()
            .then((result: IArtist[]) => resolve(result.map(item => ({
                ...item,
                numberOfSongs: Number(item.numberOfSongs),
                cover: avatarHelper.getAvatar(),
            }))))
            .catch((error: Error) => {
                reject(error);
            });
    })
}