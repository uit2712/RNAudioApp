import { PlaylistsScreenActions } from '../actions/playlists-screen-actions';
import { IPlaylistsScreenState } from '../interfaces';

const initializeState: IPlaylistsScreenState = {
    playlists: [
        {
            type: 'last-played',
            name: 'Phát lần cuối',
            listSongs: []
        },
        {
            type: 'most-played',
            name: 'Phát nhiều nhất',
            listSongs: []
        },
        {
            type: 'favorite',
            name: 'Mục yêu thích',
            listSongs: []
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