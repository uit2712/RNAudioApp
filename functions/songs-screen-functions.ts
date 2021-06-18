import * as RN from 'react-native';

import { Permission, check } from 'react-native-permissions';

import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import { PermissionsAndroid } from 'react-native';
import { SoundFileType } from 'types/songs-screen-types';
import { mapTrackInfoToSoundFileTypeMemo } from '@functions/index';

export function checkPermission({
    permission,
    onError,
    onGranted,
    onUnavailable,
}: {
    permission: Permission,
    onError: (error: Error) => void,
    onGranted?: () => void,
    onUnavailable?: () => void,
}) {
    check(permission)
        .then((result) => {
            switch(result) {
                default: break;
                case 'granted':
                    onGranted && onGranted();
                    break;
                case 'unavailable':
                    onUnavailable && onUnavailable();
                    break;
            }
        }).catch((err: Error) => {
            onError && onError(err);
        });
}

export function getAllMusicFiles({
    onError,
    onSuccess,
}: {
    onError: (error: Error) => void,
    onSuccess: (result: SoundFileType[]) => void,
}) {
    MusicFiles.getAll({
        id: true, // get id
        artist: true, // get artist
        duration: true, // get duration
        genre: true, // get genre
        title: true, // get title
        fileName: true, // get file name
        displayName: true,
        albumArtist: true,
        author: true,
        album: true,
        blured: true,
    }).then((tracks: ITrackInfo[]) => {
        onSuccess(mapTrackInfoToSoundFileTypeMemo(tracks));
    }).catch(onError);
}

export function showPopupRequestPermission({
    permission,
    onError,
    onGranted,
    onDenined,
}: {
    permission: RN.Permission,
    onError: (error: Error) => void,
    onGranted?: () => void,
    onDenined?: () => void,
}) {
    PermissionsAndroid.request(permission, {
        title: 'Quyền truy cập bộ nhớ',
        message: 'Music App cần đọc bộ nhớ của bạn để bạn có thể nghe nhạc.',
        buttonNeutral: 'Hỏi tôi sau',
        buttonNegative: 'Hủy',
        buttonPositive: 'Đồng ý'
    }).then((granted: RN.PermissionStatus) => {
        switch(granted) {
            default: break;
            case 'granted':
                onGranted && onGranted();
                break;
            case 'denied':
                onDenined && onDenined();
                break;
        }
    }).catch(onError);
}