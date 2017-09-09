/**
 * Created by Qilong on 8/29/2017.
 */
const initialState = {
    currentTrack:{},
    relatedTracks: [],
    comments: []
};

/*
 * tracksReducers deal with the actions that fetch tracks from server and set tracks to the tracks list, which
 * will be rendered to the map page.  pass tracks to TrackList component
 *
 * **/
const trackDetailsReducers = function (state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_TRACK":
            const {currentTrack} = action.payload;
            return {
                ...state,
                currentTrack: currentTrack,
                relatedTracks: [],
            };
        case "SET_RELATED_TRACKS":
            const {relatedTracks} = action.payload;
            return {
                ...state,
                relatedTracks: relatedTracks,
            };
        case "SET_COMMENTS":
            const {comments} = action.payload;
            return {
                ...state,
                comments: comments
            };
            break;
        case "RESET_TRACK_DETAILS":
            return {
                currentTrack:{},
                relatedTracks: [],
                comments: []
            };
            break;
        default:
            return state;
    }
};

export default trackDetailsReducers;