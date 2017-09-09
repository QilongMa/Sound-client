export function getPlayList() {
    return function(dispatch, getState) {
        const tracks = getState().tracks;
        dispatch({
            type: 'GET_PLAYLIST',
            payload: tracks
        })
    }
}
export function setPlaylist(playlist) {
    return {
        type: 'SET_PLAYLIST',
        playload: playlist
    }
}

export function AddMoreToPlaylist(tracks) {
    return {
        type: 'ADD_TRACKS_TO_PLAYLIST',
        payload: tracks
    }
}

export function playTracks(track) {
    return {
        type: 'PLAY_TRACKS',
        payload: track
    }
}


export function setDuration(duration) {
    return {
        type: 'SET_DURATION',
        payload: duration
    }
}

export function setCurrentTime(currentTime) {
    return {
        type: 'SET_CURRENT_TIME',
        payload: currentTime
    }
}

export function toggleIsPlaying () {
    return {
        type: 'TOGGLE_IS_PLAYING'
    }
}



