import { GenresScreenActions } from '@store/actions/genres-screen-actions';
import { IGenresScreenState } from '@store/interfaces';

const initializeState: IGenresScreenState = {
    genres: [],
    isLoadListGenresFirstTime: false,
}

export default function GenresScreenReducer(state = initializeState, action: GenresScreenActions): IGenresScreenState {
    switch(action.type) {
        default: return state;
        case 'SET_LIST_GENRES':
            return {
                ...state,
                genres: action.payload,
                isLoadListGenresFirstTime: true,
            }
    }
}