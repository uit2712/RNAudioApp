import { AlbumsScreenActions } from '@store/actions/albums-screen-actions';
import { IAlbumsScreenState } from '@store/interfaces';

const initializeState: IAlbumsScreenState = {
    albums: [],
    isLoadListAlbumsFirstTime: false,
    orderType: 'asc',
    sortByProperyType: 'numberOfSongs',
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
        case 'SET_ALBUM_ORDER_TYPE':
            return {
                ...state,
                orderType: action.payload,
            }
        case 'SET_ALBUM_SORT_BY_PROPERTY_TYPE':
            return {
                ...state,
                sortByProperyType: action.payload,
            }
    }
}