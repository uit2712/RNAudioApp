import { IApplicationState } from '@store/interfaces';
import { useSelector } from 'react-redux';

export function useGetSearchTextSelector() {
    return useSelector<IApplicationState, string>(state => state.search.searchText);
}