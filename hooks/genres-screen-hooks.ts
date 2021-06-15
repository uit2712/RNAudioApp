import { IGenre } from '@interfaces/genres-screen-interfaces';
import React from 'react';
import { getAllGenres } from '@functions/genres-screen-functions';
import { setListGenresAction } from '@store/actions/genres-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetListGenresSelector } from '@store/selectors/genres-screen-selectors';

export function useGetAllGenres(isGrantedPermission: boolean) {
    const { genres, isLoadFirstTime } = useGetListGenresSelector();
    React.useEffect(() => {
        if (isLoadFirstTime === false && isGrantedPermission === true) {
            getGenres();
        }
    }, [isLoadFirstTime, isGrantedPermission]);
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const dispatch = useDispatch();
    function getGenres() {
        setIsLoading(true);
        getAllGenres()
            .then((result: IGenre[]) => {
                setIsLoading(false);
                setIsRefresh(false);
                dispatch(setListGenresAction(result));
            }).catch((error: Error) => {
                setIsLoading(false);
                setIsRefresh(false);
                setErrorMessage(error.message);
            });
    }
    
    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            getGenres();
        }
    }, [isRefresh]);

    return {
        genres,
        isLoading,
        errorMessage,
        isFinished: isLoadFirstTime === true,
        refresh: () => setIsRefresh(true),
    }
}