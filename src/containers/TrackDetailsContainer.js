import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TrackDetails from '../components/trackDetails/TrackDetails';
import {playTracks, getTrackDetails, getComments, resetComponent, toggleIsPlaying} from '../actions';

function mapStateToProps(state) {
    const {currentTrack, relatedTracks, comments} = state.trackDetails;
    const {isPlaying, playingTrackId} = state.player;
    const playList = state.player.currentPlayList;
    return {
        currentTrack,
        comments,
        relatedTracks,
        playList,
        isPlaying,
        playingTrackId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getTrackDetails,
            getComments,
            playTracks,
            resetComponent,
            toggleIsPlaying
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetails);
