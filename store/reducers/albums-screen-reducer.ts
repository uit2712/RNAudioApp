import { AlbumsScreenActions } from '../actions/albums-screen-actions';
import { IAlbumsScreenState, } from '../interfaces';

const initializeState: IAlbumsScreenState = {
    albums: [],
    isLoadListAlbumsFirstTime: false,
}

export default function AlbumsScreenReducer(state = initializeState, action: AlbumsScreenActions): IAlbumsScreenState {
    switch(action.type) {
        case 'SET_LIST_ALBUMS':
            return {
                ...state,
                albums: action.payload,
            }
        default: return state;
    }
}