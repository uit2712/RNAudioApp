import { IArtist } from '@interfaces/artists-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { mapTrackInfoToSoundFileType } from '.';

export function getListSongsByArtistId(artist: IArtist): Promise<IListSongsDetail> {
    return new Promise((resolve: (value: IListSongsDetail) => void, reject: (value?: Error) => void) => {
        MusicFiles.getListSongs({
            artistId: artist.id,
        }).then((tracks: ITrackInfo[]) => {
            resolve({
                listSongs: mapTrackInfoToSoundFileType(tracks),
                name: artist.artist,
                cover: artist.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}