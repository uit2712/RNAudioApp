import { IApplicationState } from '@store/interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { useSelector } from 'react-redux';

export function useGetCurrentListSoundsSelector() {
    return useSelector<IApplicationState, SoundFileType[]>(state => state.common.currentListSongs);
}