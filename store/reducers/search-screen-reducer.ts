import { ISearchScreenState } from '@store/interfaces';
import { SearchScreenActions } from '@store/actions/search-screen-actions';

const initializeState: ISearchScreenState = {
    searchText: '',
}

export default function SearchScreenReducer(state = initializeState, action: SearchScreenActions): ISearchScreenState {
    switch(action.type) {
        default: return state;
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload,
            }
    }
}