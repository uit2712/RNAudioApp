import { GenresScreenActions } from '@store/actions/genres-screen-actions';
import { IGenresScreenState } from '@store/interfaces';

const initializeState: IGenresScreenState = {
    genres: [],
    isLoadListGenresFirstTime: false,
    orderType: 'asc',
    sortByProperyType: 'name',
    isRefresh: false,
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
        case 'SET_GENRE_ORDER_TYPE':
            return {
                ...state,
                orderType: action.payload,
            }
        case 'SET_GENRE_SORT_BY_PROPERTY_TYPE':
            return {
                ...state,
                sortByProperyType: action.payload,
            }
        case 'SET_GENRE_IS_REFRESH':
            return {
                ...state,
                isRefresh: action.payload,
            }
    }
}