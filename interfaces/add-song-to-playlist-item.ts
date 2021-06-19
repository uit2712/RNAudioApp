import { IPlaylist } from './playlists-screen-interfaces';

export interface IAddSongToPlaylistItemProps {
    value: IPlaylist;
    onCheck?: () => void;
    isChecked: boolean;
}