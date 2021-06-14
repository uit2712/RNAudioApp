import { checkPermission, getAllMusicFiles, showPopupRequestPermission } from '@functions/songs-screen-functions';

import { PERMISSIONS } from 'react-native-permissions';
import React from 'react';
import { setListSongsAction } from '@store/actions/songs-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';
import { useRefresh, } from '.';

export function useGetAllMusicFiles(isGrantedPermission: boolean) {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();
    function initialize() {
        getAllMusicFiles({
            onSuccess: (result) => dispatch(setListSongsAction(result)),
            onError: (error) => setErrorMessage(error.message),
        });
    }

    const { songs, isLoadFirstTime } = useGetAllSongsSelector();
    const [errorMessage, setErrorMessage] = React.useState('');
    const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    React.useEffect(() => {
        if (isLoadFirstTime === false && isGrantedPermission === true) {
            initialize();
        }
    }, [isLoadFirstTime, isGrantedPermission]);

    const [warningMessage, setWarningMessage] = React.useState('');
    function requestPermission() {
        showPopupRequestPermission({
            permission,
            onError: (error: Error) => setErrorMessage(error.message),
            onGranted: initialize,
            onDenined: () => setWarningMessage('Bạn không thể chơi nhạc được nếu không cấp quyền cho ứng dụng này.'),
        })
    }

    const { setIsRefresh } = useRefresh(() => checkPermission({
        permission,
        onError: (err: Error) => setErrorMessage(err.message),
        onGranted: initialize,
        onUnavailable: requestPermission,
    }));

    return {
        songs,
        errorMessage,
        isLoading,
        warningMessage,
        isFinished: isLoadFirstTime === true,
        refresh: () => setIsRefresh(true),
    };
}