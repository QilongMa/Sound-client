import SC from 'soundcloud';

import axios from 'axios';

export function auth() {
    return function(dispatch) {
        let user;
        let session;
        if (window.localStorage) {
            user = window.localStorage.getItem('user');
            session = window.localStorage.getItem('session');
            if (user && session) {
                dispatch({
                    type: 'SET_USER',
                    payload: JSON.parse(user),
                });
                dispatch({
                    type: 'SET_SESSION',
                    payload: JSON.parse(session)
                });
                getTracks(session, dispatch);
                return;
            }
        }

        SC.connect().then((session) => {
            setSession(dispatch, session);
            getUser(session, dispatch);
            getTracks(session, dispatch);
        });
    }
}

function setSession(dispatch, session) {
    dispatch({
        type: 'SET_SESSION',
        payload: session
    })
}


function getUser(session, dispatch) {
    axios({
        method: 'get',
        url: `//api.soundcloud.com/me?oauth_token=${session.oauth_token}`
    }).then((response) => {
        if(window.localStorage) {
            window.localStorage.setItem('user', response.data);
            window.localStorage.setItem('token', session.oauth_token);
        }
        dispatch({
            type: "SET_USER",
            payload: response.data
        })
    })
}

function getTracks(session, dispatch) {
    axios({
        method: 'get',
        url: `//api.soundcloud.com/me/activities?limit=20&offset=0&oauth_token=${session.oauth_token}`
    })
        .then((response) => {
        const tracks = response.data.collection.map((track => track.origin || track));
        dispatch({
            type: 'GET_TRACKS',
            payload: tracks
        })
    })
}

