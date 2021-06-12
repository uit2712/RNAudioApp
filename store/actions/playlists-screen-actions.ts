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
export type PlaylistsScreenActions = {
    type: 'ADD_AUDIO_TO_PLAYLIST';
    payload: AddAudioToPlaylistPayload
} | {
    type: 'REMOVE_AUDIO_FROM_PLAYLIST';
    payload: RemoveAudioFromPlaylistPayload;
} | {
    type: 'ADD_NEW_PLAYLIST';
    payload: AddNewPlaylistPayload;
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
})