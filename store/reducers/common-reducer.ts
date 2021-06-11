import { CommonActions } from '@store/actions/common-actions';
import { ICommonState } from '@store/interfaces';

const initializeState: ICommonState = {
    isShowSortByBottomSheet: false,
}

export default function CommonReducer(state = initializeState, action: CommonActions): ICommonState {
    switch(action.type) {
        default: return state;
        case 'SET_IS_SHOW_SORT_BY_BOTTOM_SHEET':
            return {
                ...state,
                isShowSortByBottomSheet: action.payload,
            }
    }
}