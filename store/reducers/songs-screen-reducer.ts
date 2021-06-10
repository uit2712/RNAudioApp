import { ISongsScreenState } from '@store/interfaces';
import { SongsScreenActions } from '@store/actions/songs-screen-actions';

const initializeState: ISongsScreenState = {
    songs: [],
    isLoadListSongsFirstTime: false,
    orderType: 'asc',
    sortByProperyType: 'name',
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
        case 'SET_SONG_ORDER_TYPE':
            return {
                ...state,
                orderType: action.payload,
            }
        case 'SET_SORT_BY_PROPERTY_TYPE':
            return {
                ...state,
                sortByProperyType: action.payload,
            }
    }
}