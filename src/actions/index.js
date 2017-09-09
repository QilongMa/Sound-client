import {getTracks, loadMoreTracks} from './trackActions';
import {searchTracks} from './searchActions';
import {auth} from './authActions';
import {playTracks, setCurrentTime, setDuration, setPlaylist, toggleIsPlaying} from './playerActions';
import {getTrackDetails, getComments, resetComponent} from "./trackDetailActions";

export {
    auth,

    searchTracks,

    playTracks,
    setCurrentTime,
    setDuration,
    setPlaylist,
    toggleIsPlaying,

    getTracks,
    loadMoreTracks,

    getTrackDetails,
    getComments,
    resetComponent
};