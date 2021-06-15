import { IApplicationState } from '@store/interfaces';
import { IGenre } from '@interfaces/genres-screen-interfaces';
import { useSelector } from 'react-redux';

export function useGetListGenresSelector() {
    return useSelector<IApplicationState, { genres: IGenre[], isLoadFirstTime: boolean }>(state => ({
        genres: state.genres.genres,
        isLoadFirstTime: state.genres.isLoadListGenresFirstTime,
    }));
}