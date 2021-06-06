import { SongsScreenActions } from '../actions/Songs-screen-actions';
import { ISongsScreenState, } from '../interfaces';

const initializeState: ISongsScreenState = {
    songs: [],
    isLoadListSongsFirstTime: false,
}

export default function SongsScreenReducer(state = initializeState, action: SongsScreenActions): ISongsScreenState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_SONGS':
            return {
                ...state,
                songs: action.payload,
                isLoadListSongsFirstTime: true,
            }
    }
}