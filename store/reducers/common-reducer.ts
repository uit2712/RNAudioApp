import { CommonActions } from '@store/actions/common-actions';
import { ICommonState } from '@store/interfaces';

const initializeState: ICommonState = {
    currentListSongs: [],
}

export default function CommonReducer(state = initializeState, action: CommonActions): ICommonState {
    switch(action.type) {
        default: return state;
        case 'SET_CURRENT_LIST_SONGS':
            return {
                ...state,
                currentListSongs: action.payload,
            }
    }
}