import React, {Component} from 'react';
import TrackTitle from './sharedComponents/TrackTitle';
import TrackUser from './sharedComponents/TrackUser';
import TrackStats from './sharedComponents/TrackStats';
import TrackWave from '../../containers/TrackWaveContainer';

class RelatedTracks extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(track) {
        // toggleIsPlaying
        if (track.track_id !== this.props.playingTrackId) {
            this.props.playTracks(track);
        } else {
            this.props.toggleIsPlaying();
        }
    }

    render() {
        const allTracks = this.props.tracks;
        const {isPlaying, playingTrackId} = this.props;
        if (allTracks.length === 0) {
            return null;
        }
        const track = allTracks.map((track, index) => {
            return (
                <div className="song-list-item" key={track.id}>
                    <div className="song-list-item-image"
                         style={{backgroundImage: `url(${track.artwork_url})`}}
                    >
                        <div className="toggle-play-button-detail"
                             onClick={() => this.handleClick({
                                 track_id: track.id,
                                 track_index: index + 1
                             })}
                        >
                            <div className="toggle-play-button-detail-icon">
                                <i className={isPlaying && playingTrackId === track.id ? "fa fa-pause" : "fa fa-play"}/>
                            </div>
                        </div>
                    </div>
                    <div className="song-list-item-info-wrap">
                        <div className="song-list-item-info">
                            <div className="song-list-item-title">
                                <TrackTitle title={track.title}/>
                            </div>
                            <div className="song-list-item-info-extra">
                                <div className="song-list-item-user">
                                    <TrackUser track={track}/>
                                </div>
                                <div className="song-list-item-stats">
                                    <TrackStats likesCount={track.favoritings_count}
                                                 playsCount={track.playback_count}
                                                 commentsCount={track.comment_count}
                                                 description=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <TrackWave imageSrc={track.waveform_url} trackId={track.id} index={index + 1} />
                </div>
            )
        });
        return (
            <div className="tab-content">
                {track}
            </div>
        )
    }
}

export default RelatedTracks;