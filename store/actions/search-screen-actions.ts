export type SearchScreenActions = {
    type: 'SET_SEARCH_TEXT';
    payload: string;
}

export const setSearchText = (request: string): SearchScreenActions => ({
    type: 'SET_SEARCH_TEXT',
    payload: request,
});