import { ISongsScreenState, } from '@interfaces/index';
import { SongsScreenActions } from '../actions/Songs-screen-actions';

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