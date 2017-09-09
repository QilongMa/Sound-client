
const initialState = {
    currentPlayList: [],
    isPlaying: false,
    playingTrack: {},
    playingTrackIndex: -1,
    duration: 0,
    currentTime: 0
};


export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TRACKS_TO_PLAYLIST":
            const newPlaylist = [...state.currentPlayList, ...action.payload];
            return {
                ...state,
                currentPlayList: newPlaylist
            };
        case "PLAY_TRACKS":
            return {
                ...state,
                playingTrackIndex: action.payload.track_index,
                playingTrackId: action.payload.track_id,
                isPlaying: true
            };
        case "SET_CURRENT_TIME":
            return {
                ...state,
                currentTime: action.payload
            };
        case "SET_DURATION":
            return {
                ...state,
                duration: action.payload
            };
        case "SET_PLAYLIST":
            return {
                ...state,
                currentPlayList: action.payload
            };
        case "TOGGLE_IS_PLAYING":
            return {
                ...state,
                isPlaying: !state.isPlaying
            };
        default:
            return state;
    }

}