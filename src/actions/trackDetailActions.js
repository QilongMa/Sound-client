import {CLIENT_ID} from "../constants/auth";
import axios from 'axios';

export function getTrackDetails(id) {
    return function (dispatch) {
        const trackId = id;
        const URL = `http://api.soundcloud.com/tracks/${trackId}?client_id=a281614d7f34dc30b665dfcaa3ed7505`;
        axios.get(URL)
            .then(function (response) {
                let track = response.data;
                dispatch({
                    type: "SET_CURRENT_TRACK",
                    payload: {
                        currentTrack: track
                    }
                });
                getRelatedTracks(track, dispatch);
            })
            .catch(function (err) {
                console.log('error when fetching tracks ..', err);
            });
    }
}

function getRelatedTracks(track, dispatch) {
    axios.get(`http://api.soundcloud.com/users/${track.user.id}/tracks?client_id=${CLIENT_ID}`)
        .then(function (response) {
            let tracks = response.data;
            dispatch({
                type: "SET_RELATED_TRACKS",
                payload: {
                    relatedTracks: tracks
                }
            });
            let playlist = [track, ...tracks];
            dispatch({
                type: "SET_PLAYLIST",
                payload: playlist
            })
        })
}

export function getComments(trackId) {
    return function(dispatch) {
        axios.get(`http://api.soundcloud.com/tracks/${trackId}/comments?client_id=a281614d7f34dc30b665dfcaa3ed7505`)
            .then(function (response) {
                const comments = response.data;
                dispatch({
                    type: "SET_COMMENTS",
                    payload: {
                        comments: comments
                    }
                })
            })
            .catch(function (err) {
                console.log('error when fetching comments ...', err);
            })
    }
}

export function resetComponent() {
    return {
        type: "RESET_TRACK_DETAILS"
    }
}