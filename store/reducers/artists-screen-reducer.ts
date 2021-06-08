import { ArtistsScreenActions } from '@store/actions/artists-screen-actions';
import { IArtistsScreenState } from '@store/interfaces';

const initializeState: IArtistsScreenState = {
    artists: [],
    isLoadListArtistsFirstTime: false,
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
    }
}