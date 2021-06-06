import { combineReducers } from 'redux';
import AlbumsScreenReducer from './artists-screen-reducer';
import ArtistsScreenReducer from './artists-screen-reducer';
import PlaylistsScreenReducer from './playlists-screen-reducer';

const reducer = combineReducers({
    playlists: PlaylistsScreenReducer,
    artists: ArtistsScreenReducer,
    albums: AlbumsScreenReducer,
});

export default reducer;