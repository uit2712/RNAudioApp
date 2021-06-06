import FastImage from 'react-native-fast-image';
import { IMAGE_RESOURCE_URL } from '../../constants';
import { PlaylistsScreenActions } from '../actions/playlists-screen-actions';
import { IPlaylistsScreenState } from '../interfaces';

const initializeState: IPlaylistsScreenState = {
    playlists: [
        {
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
            type: 'favorite',
            name: 'Mục yêu thích',
            listSongs: [],
            cover: require('../../images/favorite-icon.png'),
            shadowColor: 'darkorange',
        }
    ]
}

export default function PlaylistsScreenReducer(state = initializeState, action: PlaylistsScreenActions): IPlaylistsScreenState {
    switch(action.type) {
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
        default: return state;
    }
}