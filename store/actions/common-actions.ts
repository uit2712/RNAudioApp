export type CommonActions = {
    type: 'SET_IS_SHOW_SORT_BY_BOTTOM_SHEET';
    payload: boolean;
}

export const setIsShowSortByBottomSheet = (request: boolean): CommonActions => ({
    type: 'SET_IS_SHOW_SORT_BY_BOTTOM_SHEET',
    payload: request,
});