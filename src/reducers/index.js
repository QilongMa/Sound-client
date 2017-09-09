import {combineReducers} from 'redux';

import authReducer from './authReducer';
import playerReducer from './playerReducer';
import tracksReducers from './tracksReducer';
import trackDetailsReducer from './trackDetailsReducer';

export default combineReducers({
    auth: authReducer,
    player: playerReducer,
    tracksList: tracksReducers,
    trackDetails: trackDetailsReducer
})
