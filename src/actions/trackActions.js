import axios from 'axios';

export function getTracks() {
    return function(dispatch){
        const URL = "https://api.soundcloud.com/tracks?client_id=a281614d7f34dc30b665dfcaa3ed7505&linked_partitioning=1&limit=50&q=";
    
        axios.get(`${URL}house`)
            .then(function (response) {
                
                let tracks = response.data.collection;
                let next_href = response.data.next_href;
                dispatch({
                    type:"SET_TRACKS_LIST",
                    payload: {
                        tracksList: tracks,
                        next_href: next_href
                    }
                });
                dispatch({
                    type: 'SET_PLAYLIST',
                    payload: tracks
                })
            })
            .catch(function(err) {
                console.log('error when fetching initial tracks ..');
            })
    }
}

export function loadMoreTracks(next_href, toggleLoading) {
    return function(dispatch) {
        axios.get(next_href)
            .then(function (response) {
                let tracks = response.data.collection;
                let next_href = response.data.next_href;
                dispatch({
                    type:"LOAD_MORE_TRACKS",
                    payload: {
                        tracksList: tracks,
                        next_href: next_href
                    }
                });
                dispatch({
                    type: "ADD_TRACKS_TO_PLAYLIST",
                    payload: tracks
                })
                toggleLoading();
            })
            .catch(function(err) {
                console.log('error when loading more tracks ..');
            })
    }
}


