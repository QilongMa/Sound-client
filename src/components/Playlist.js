import React, {Component} from 'react';
import '../../style/playlist.scss'

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleClickTrack = this.handleClickTrack.bind(this);
        this.isActive = this.isActive.bind(this);
    }

    handleClickTrack(track_index, track_id) {
        this.props.playTracks({track_index, track_id});
    }

    isActive(track_id) {
        return track_id === this.props.playingTrackId
    }


    render() {
        const {playList=[]} = this.props;
        const trackList = playList.map((track, index) => {
            const isActive = this.isActive(track.id);
            return(
              <li
                key={`${track.id}-${index}`}
              >
                  <div className={`track-item ${isActive ? 'playlist-active' : ''}`}
                    onClick={() => this.handleClickTrack(index, track.id)}
                  >
                      <img className='playlist-image'
                        src={track.artwork_url || '/images/track-avatar.jpg'}
                      />
                      <span className="track-title" title={track.title}>{track.title}</span>
                  </div>
              </li>
            );
        });

        return(
            <div
                className="playlist"
            >
                <div className="playlist-header">
                    {'Playlist'}
                </div>
                <div className="playlist-body">
                    <ul className="track-list">
                        {trackList}
                    </ul>
                </div>
                <div className="playlist-footer">
                    Total {playList.length} tracks
                </div>
            </div>
        )
    }

}

export default Playlist;