import { ISongsScreenState } from '@store/interfaces';
import { SongsScreenActions } from '@store/actions/songs-screen-actions';

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