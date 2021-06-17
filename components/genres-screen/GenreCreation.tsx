import CreationModal from '@components/shared/CreationModal';
import { CreationModalContext } from '@context-api/index';
import React from 'react';
import { createGenre } from '@functions/genres-screen-functions';
import { setGenreIsShouldRefreshAction } from '@store/actions/genres-screen-actions';
import { useDispatch } from 'react-redux';

function GenreCreation() {
    const dispatch = useDispatch();
    const { isVisible, toggleOverlay } = React.useContext(CreationModalContext);

    return (
        <CreationModal
            isVisible={isVisible}
            toggleOverlay={toggleOverlay}
            inputLabel='Tên'
            title='Tạo thể loại mới'
            onConfirm={(name: string, onFinished: () => void) => {
                createGenre(name).then(() => {
                    onFinished();
                    dispatch(setGenreIsShouldRefreshAction(true));
                }).catch(console.log)
            }}
        />
    )
}

export default GenreCreation;