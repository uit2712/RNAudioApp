import { IApplicationState } from '@interfaces/index';
import { useSelector } from 'react-redux';

export function useGetSearchTextSelector() {
    return useSelector<IApplicationState, string>(state => state.search.searchText);
}