import AlbumsScreenReducer from './albums-screen-reducer';
import ArtistsScreenReducer from './artists-screen-reducer';
import PlaylistsScreenReducer from './playlists-screen-reducer';
import SongsScreenReducer from './songs-screen-reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    playlists: PlaylistsScreenReducer,
    artists: ArtistsScreenReducer,
    albums: AlbumsScreenReducer,
    songs: SongsScreenReducer,
});

export default reducer;