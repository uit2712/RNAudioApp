import { ISelectedSongs } from '@interfaces/tab-songs-addition-interfaces';
import { ITabSongsAdditionState } from '@store/interfaces';
import { TabSongsAdditionActions } from '@store/actions/tab-songs-addition-actions';

const initListSelectedSongsInPlaylists: ISelectedSongs[] = [
    {
        type: 'all',
        listSongs: [],
    },
    {
        type: 'last-played',
        listSongs: [],
    },
    {
        type: 'most-played',
        listSongs: [],
    }
];
const initializeState: ITabSongsAdditionState = {
    listSelectedSongsInPlaylists: [
        ...initListSelectedSongsInPlaylists
    ],
}

export default function TabSongsAdditionReducer(state = initializeState, action: TabSongsAdditionActions): ITabSongsAdditionState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_SELECTED_SONGS':
            return {
                ...state,
                listSelectedSongsInPlaylists: state.listSelectedSongsInPlaylists.map(item => ({
                    ...item,
                    listSongs: item.type === action.payload.type ? action.payload.listSongs : item.listSongs
                })),
            }
        case 'CLEAR_LIST_SELECTED_SONGS':
            return {
                ...state,
                listSelectedSongsInPlaylists: [
                    ...initListSelectedSongsInPlaylists
                ],
            }
        case 'SET_PLAYLIST_SONGS_SHOULD_BE_ADDED':
            return {
                ...state,
                playlist: action.payload,
            }
    }
}