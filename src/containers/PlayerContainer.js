import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Player from '../components/Player';
import {playTracks, setCurrentTime, setDuration, toggleIsPlaying} from '../actions/playerActions';



function mapStateToProps(state) {
    return {
        playList: state.player.currentPlayList,
        playingTrackIndex: state.player.playingTrackIndex,
        isPlaying: state.player.isPlaying,
        duration: state.player.duration,
        currentTime: state.player.currentTime
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playTracks,
            setCurrentTime,
            setDuration,
            toggleIsPlaying
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);