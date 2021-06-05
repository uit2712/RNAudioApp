import { useSelector } from 'react-redux';
import { IApplicationState } from '../interfaces';

export function useGetCount(): number {
    return useSelector<IApplicationState, number>(state => state.counter.count);
}