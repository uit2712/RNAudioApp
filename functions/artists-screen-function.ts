import { IArtist } from '@interfaces/artists-screen-interfaces';
import { IListSongsDetail } from '@interfaces/index';
import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { SoundFileType } from 'types/songs-screen-types';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import { formatTimeString } from '.';

export function getListSongsByArtistId(artist: IArtist): Promise<IListSongsDetail> {
    return new Promise((resolve: (value: IListSongsDetail) => void, reject: (value?: Error) => void) => {
        MusicFiles.getListSongs({
            artistId: artist.id,
        }).then((tracks: ITrackInfo[]) => {
            const songs: SoundFileType[] = tracks.map((item: ITrackInfo) => ({
                type: 'other',
                id: item.id,
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
                name: artist.artist,
                cover: artist.cover,
            });
        }).catch((error: Error) => {
            reject(error);
        });
    });
}