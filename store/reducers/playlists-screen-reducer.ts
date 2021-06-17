import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { IMAGE_RESOURCE_URL } from '@constants/index';
import { IPlaylistsScreenState } from '@store/interfaces';
import { PlaylistsScreenActions } from '@store/actions/playlists-screen-actions';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import { distinct } from '@functions/tab-songs-addition-functions';
import { makeId } from '@functions/index';

const initializeState: IPlaylistsScreenState = {
    playlists: [
        {
            id: makeId(),
            type: 'last-played',
            name: 'Phát lần cuối',
            listSongs: [],
            cover: {
                uri: `${IMAGE_RESOURCE_URL}/48.jpg`,
                priority: FastImage.priority.normal,
            },
            shadowColor: 'green',
        },
        {
            id: makeId(),
            type: 'most-played',
            name: 'Phát nhiều nhất',
            listSongs: [],
            cover: {
                uri: `${IMAGE_RESOURCE_URL}/36.jpg`,
                priority: FastImage.priority.normal,
            },
            shadowColor: 'orange',
        },
        {
            id: makeId(),
            type: 'favorite',
            name: 'Mục yêu thích',
            listSongs: [],
            cover: require('../../images/favorite-icon.png'),
            shadowColor: 'darkorange',
        }
    ]
}

export const PlaylistsScreenReducerPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['playlists']
};

export function PlaylistsScreenReducer(state = initializeState, action: PlaylistsScreenActions): IPlaylistsScreenState {
    switch(action.type) {
        default: return state;
        case 'REMOVE_AUDIO_FROM_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.map(item => {
                    if (item.type === action.payload.type) {
                        item.listSongs = item.listSongs.filter(song => song.id !== action.payload.audioId);
                    }

                    return item;
                })
            }
        case 'ADD_AUDIO_TO_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.map(item => {
                    if (item.type === action.payload.type) {
                        const foundAudio = item.listSongs.find(audio => audio.id === action.payload.audio.id);
                        if (foundAudio) {
                            item.listSongs = item.listSongs.filter(audio => audio.id !== action.payload.audio.id);
                        }
                        item.listSongs.push(action.payload.audio);
                    }

                    return item;
                })
            }
        case 'ADD_NEW_PLAYLIST':
            return {
                ...state,
                playlists: [
                    ...state.playlists,
                    {
                        id: makeId(),
                        type: 'custom-playlist',
                        cover: {
                            uri: action.payload.cover ?? avatarHelper.getAvatar()
                        },
                        listSongs: [],
                        name: action.payload.name,
                        shadowColor: 'orange',
                    }
                ]
            }
        case 'ADD_LIST_AUDIO_TO_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.map(item => {
                    if (item.id === action.payload.playlistId) {
                        item.listSongs = distinct([
                            ...item.listSongs,
                            ...action.payload.listAudio,
                        ], 'id');
                    }

                    return item;
                }),
            }
        case 'SET_PLAYLIST_VISIBILITY':
            return {
                ...state,
                playlists: state.playlists.map(item => {
                    if (action.payload.listPlaylistIds.indexOf(item.id) >= 0) {
                        return {
                            ...item,
                            isHidden: action.payload.isHidden,
                        }
                    }

                    return item;
                }),
            }
    }
}