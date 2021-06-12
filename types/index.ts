import { PlaylistType } from './playlists-screen-types';

export type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'next' | 'previous' | 'stop';
export type SortOrderType = 'asc' | 'desc';
export type ListSongsDetailType = PlaylistType | 'album' | 'artist';