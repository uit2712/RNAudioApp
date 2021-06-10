import { ArtistsScreenActions } from '@store/actions/artists-screen-actions';
import { IArtistsScreenState } from '@store/interfaces';

const initializeState: IArtistsScreenState = {
    artists: [],
    isLoadListArtistsFirstTime: false,
    orderType: 'asc',
    sortByProperyType: 'numberOfSongs',
}

export default function ArtistsScreenReducer(state = initializeState, action: ArtistsScreenActions): IArtistsScreenState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_ARTISTS':
            return {
                ...state,
                artists: action.payload,
                isLoadListArtistsFirstTime: true,
            }
        case 'SET_ARTIST_ORDER_TYPE':
            return {
                ...state,
                orderType: action.payload,
            }
        case 'SET_ARTIST_SORT_BY_PROPERTY_TYPE':
            return {
                ...state,
                sortByProperyType: action.payload,
            }
    }
}