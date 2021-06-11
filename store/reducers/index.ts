import { PlaylistsScreenReducer, PlaylistsScreenReducerPersistConfig } from './playlists-screen-reducer';

import AlbumsScreenReducer from './albums-screen-reducer';
import ArtistsScreenReducer from './artists-screen-reducer';
import SearchScreenReducer from './search-screen-reducer';
import SongsScreenReducer from './songs-screen-reducer';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const reducer = combineReducers({
    playlists: persistReducer(PlaylistsScreenReducerPersistConfig, PlaylistsScreenReducer),
    artists: ArtistsScreenReducer,
    albums: AlbumsScreenReducer,
    songs: SongsScreenReducer,
    search: SearchScreenReducer,
});

export default reducer;