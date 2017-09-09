import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TrackWave from '../components/trackDetails/sharedComponents/TrackWave';
import {playTracks, toggleIsPlaying} from '../actions';

function mapStateToProps(state, ownProps) {
    const {isPlaying, playingTrackId} = state.player;
    return {
        ...ownProps,
        isPlaying,
        playingTrackId,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playTracks,
            toggleIsPlaying
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackWave);
