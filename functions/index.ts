import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import memoizeOne from 'memoize-one';
import { navigate } from '@navigators/config';
import { updatingModalManager } from '@constants/index';

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

export function formatTimeString(miliseconds: number) {
    return new Date(miliseconds > 0 ? miliseconds : 0).toISOString().substr(11, 8);
}

export function listToMatrix<T>(list: T[], elementsPerSubArray: number): Array<T[]> {
    if (elementsPerSubArray <= 0) {
        return [];
    }

    let matrix: Array<T[]> = [];
    let i: number;
    let k: number;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

export function dynamicSort(property: string) {
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a: any, b: any) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */

        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export function dynamicSortMultiple(...args: string[]) {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    return function (obj1: any, obj2: any) {
        var i = 0, result = 0, numberOfProperties = args.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(args[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

export function makeId(length: number = 20) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function mapTrackInfoToSoundFileType(tracks: ITrackInfo[]): SoundFileType[] {
    return tracks.map((item: ITrackInfo) => ({
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
}
export const mapTrackInfoToSoundFileTypeMemo = memoizeOne(mapTrackInfoToSoundFileType);

export function navigateToAddToPlaylistScreen(item: SoundFileType) {
    navigate('Home', {
        screen: 'TabOthers',
        params: {
            screen: 'AddSongToPlaylist',
            params: {
                sound: item,
            }
        }
    })
}

export function showUpdatingModal(props: any) {
    const ref = updatingModalManager.getDefault();
    if (!!ref) {
        ref.current?.showModal(props);
    }
}

export function hideUpdatingModal() {
    const ref = updatingModalManager.getDefault();
    if (!!ref) {
        ref.current?.hideModal();
    }
}

export function isUpdatingModalVisible() {
    const ref = updatingModalManager.getDefault();
    if (!!ref) {
        return ref.current?.isVisible();
    }

    return false;
}