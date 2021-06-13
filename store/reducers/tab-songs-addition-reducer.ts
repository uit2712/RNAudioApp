import { ITabSongsAdditionState } from '@store/interfaces';
import { TabSongsAdditionActions } from '@store/actions/tab-songs-addition-actions';
import { distinct } from '@functions/tab-songs-addition-functions';

const initializeState: ITabSongsAdditionState = {
    listSelectedSongs: [],
}

export default function TabSongsAdditionReducer(state = initializeState, action: TabSongsAdditionActions): ITabSongsAdditionState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_SELECTED_SONGS':
            return {
                ...state,
                listSelectedSongs: distinct(
                    [
                        ...state.listSelectedSongs,
                        ...action.payload
                    ],
                    'id'
                )
            }
        case 'CLEAR_LIST_SELECTED_SONGS':
            return {
                ...state,
                listSelectedSongs: [],
            }
        case 'SET_PLAYLIST_SONGS_SHOULD_BE_ADDED':
            return {
                ...state,
                playlist: action.payload,
            }
    }
}