import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Playlist from '../components/Playlist';
import {playTracks} from '../actions/playerActions';

function mapStateToProps(state) {
    return {
        playList: state.player.currentPlayList,
        playingTrackId: state.player.playingTrackId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            playTracks
        }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);