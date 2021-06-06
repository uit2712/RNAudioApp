import { PlaylistType } from '../../interfaces/playlists-screen-interfaces';
import { SoundFileType } from '../../types/songs-screen-types';

type AddAudioToPlaylistPayload = {
    type: PlaylistType;
    audio: SoundFileType;
}
type RemoveAudioFromPlaylistPayload = {
    type: PlaylistType;
    audioId: string;
}
export type PlaylistsScreenActions = {
    type: 'ADD_AUDIO_TO_PLAYLIST';
    payload: AddAudioToPlaylistPayload
} | {
    type: 'REMOVE_AUDIO_FROM_PLAYLIST';
    payload: RemoveAudioFromPlaylistPayload;
}

export const addAudioToPlaylist = (request: AddAudioToPlaylistPayload): PlaylistsScreenActions => ({
    type: 'ADD_AUDIO_TO_PLAYLIST',
    payload: request,
});

export const removeAudioFromPlaylist = (request: RemoveAudioFromPlaylistPayload): PlaylistsScreenActions => ({
    type: 'REMOVE_AUDIO_FROM_PLAYLIST',
    payload: request,
});