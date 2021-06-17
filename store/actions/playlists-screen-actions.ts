import { PlaylistType } from 'types/playlists-screen-types';
import { SoundFileType } from 'types/songs-screen-types';

type AddAudioToPlaylistPayload = {
    type: PlaylistType;
    audio: SoundFileType;
}
type RemoveAudioFromPlaylistPayload = {
    type: PlaylistType;
    audioId: string;
}
type AddNewPlaylistPayload = {
    type: PlaylistType;
    name: string;
    cover?: string;
}
type AddListAudioToPlaylistPayload = {
    playlistId: string;
    listAudio: SoundFileType[];
}
type SetPlaylistVisibilityPayload = {
    listPlaylistIds: string[];
    isHidden: boolean;
}
export type PlaylistsScreenActions = {
    type: 'ADD_AUDIO_TO_PLAYLIST';
    payload: AddAudioToPlaylistPayload
} | {
    type: 'REMOVE_AUDIO_FROM_PLAYLIST';
    payload: RemoveAudioFromPlaylistPayload;
} | {
    type: 'ADD_NEW_PLAYLIST';
    payload: AddNewPlaylistPayload;
} | {
    type: 'ADD_LIST_AUDIO_TO_PLAYLIST';
    payload: AddListAudioToPlaylistPayload;
} | {
    type: 'SET_PLAYLIST_VISIBILITY';
    payload: SetPlaylistVisibilityPayload;
} | {
    type: 'REMOVE_PLAYLIST';
    payload: string;
}

export const addAudioToPlaylistAction = (request: AddAudioToPlaylistPayload): PlaylistsScreenActions => ({
    type: 'ADD_AUDIO_TO_PLAYLIST',
    payload: request,
});

export const removeAudioFromPlaylistAction = (request: RemoveAudioFromPlaylistPayload): PlaylistsScreenActions => ({
    type: 'REMOVE_AUDIO_FROM_PLAYLIST',
    payload: request,
});

export const addNewPlaylistAction = (request: AddNewPlaylistPayload): PlaylistsScreenActions => ({
    type: 'ADD_NEW_PLAYLIST',
    payload: request,
});

export const addListAudioToPlaylistAction = (request: AddListAudioToPlaylistPayload): PlaylistsScreenActions => ({
    type: 'ADD_LIST_AUDIO_TO_PLAYLIST',
    payload: request,
});

export const setPlaylistVisibilityAction = (request: SetPlaylistVisibilityPayload): PlaylistsScreenActions => ({
    type: 'SET_PLAYLIST_VISIBILITY',
    payload: request,
});

export const removePlaylistAction = (request: string): PlaylistsScreenActions => ({
    type: 'REMOVE_PLAYLIST',
    payload: request,
});