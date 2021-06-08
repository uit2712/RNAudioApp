import { AlbumsScreenActions } from '../actions/albums-screen-actions';
import { IAlbumsScreenState, } from '@interfaces/index';

const initializeState: IAlbumsScreenState = {
    albums: [],
    isLoadListAlbumsFirstTime: false,
}

export default function AlbumsScreenReducer(state = initializeState, action: AlbumsScreenActions): IAlbumsScreenState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_ALBUMS':
            return {
                ...state,
                albums: action.payload,
                isLoadListAlbumsFirstTime: true,
            }
    }
}