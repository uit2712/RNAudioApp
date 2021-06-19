import { ICurrentAudioInfo, IUpdatingModal } from '@interfaces/index';

import { ModalManager } from '@helpers/modal-helper';
import { formatTimeString } from '@functions/index';

export const LIST_IMAGE_NAMES = ['1.jpeg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '2.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpeg', '27.jpg', '28.jpg', '29.jpg', '3.jpg', '30.jpeg', '31.jpg', '32.jpeg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpeg', '39.jpg', '4.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '5.jpg', '50.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
export const IMAGE_RESOURCE_URL = 'https://raw.githubusercontent.com/uit2712/RNSources/master/RNMusicApp/images';
export const AUDIO_HELPER_CURRENT_AUDIO_INFO: ICurrentAudioInfo = {
    name: '',
    genre: '',
    artist: '',
    album: '',
    other: '<unknown>',
    durationString: formatTimeString(0),
    currentTimeString: formatTimeString(0),
    duration: 0,
    currentTime: 0,
    originalInfo: {
        type: 'other',
        id: '',
        name: '',
        other: '',
        path: '',
    }
}
export const updatingModalManager = new ModalManager();
export const initialStateUpdatingModal: IUpdatingModal = {
    isVisible: false,
    inputLabel: '',
    title: '',
    onConfirm: (param: any, onFinish: () => void) => {},
    cancelLabel: '',
    confirmLabel: '',
    // input: '',
};