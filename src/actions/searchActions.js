import SC from 'soundcloud';
import axios from 'axios';

const page_size  = 30;

export function searchTracks(route) {
    return function(dispatch){
        const URL = "https://api.soundcloud.com/tracks?client_id=a281614d7f34dc30b665dfcaa3ed7505&linked_partitioning=1&limit=50&q=";
        axios.get(`${URL}${route.query.q}`)
            .then(function (res) {
                const tracks = res.data.collection;
                const next_href = res.data.next_href;
                if(res.data){
                    dispatch({
                        type:"SET_TRACKS_LIST",
                        payload: {
                            tracksList: tracks,
                            next_href: next_href
                        }
                    });
                    dispatch({
                        type: "SET_PLAYLIST",
                        payload: tracks
                    })
                }
            })
            .catch(function(err) {
                console.log('error in searching tracks', err);
            });
    }
}


export function B_searchTracks(route) {
    return function(dispatch){
        SC.get(`/tracks?q=${route.query.q}`, {limit:page_size, linked_partitioning: 1})
            .then(function (res) {
                dispatch({
                    type:"SET_TRACKS_LIST",
                    payload:res.collection
                })
            })
            .catch(function(err) {
                console.log('error in searching tracks', err);
            })
    }
}
