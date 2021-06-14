import { SelectedSongsType } from 'types/tab-songs-addition-types';
import { SoundFileType } from 'types/songs-screen-types';

export interface ISelectedSongs {
    type: SelectedSongsType;
    listSongs: SoundFileType[];
}