import { combineReducers } from 'redux';
import PlaylistsScreenReducer from './playlists-screen-reducer';

const reducer = combineReducers({
    playlists: PlaylistsScreenReducer,
});

export default reducer;