import { combineReducers } from 'redux';
import ArtistsScreenReducer from './artists-screen-reducer';
import PlaylistsScreenReducer from './playlists-screen-reducer';

const reducer = combineReducers({
    playlists: PlaylistsScreenReducer,
    artists: ArtistsScreenReducer,
});

export default reducer;