import { IApplicationState } from '@store/interfaces';
import { useSelector } from 'react-redux';

export function useIsShowSortByBottomSheetSelector() {
    return useSelector<IApplicationState, boolean>(state => state.common.isShowSortByBottomSheet);
}