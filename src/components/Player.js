import React, {Component} from 'react';
import {CLIENT_ID} from '../constants/auth';
import Popout from "./Popout";
import Playlist from "../containers/PlaylistContainer";
import PlayerTrackTitle from './PlayerTrackTitle';

import '../../style/popout.scss';

function getStreamUrl(playList, trackIndex) {
    if (trackIndex === undefined || !playList || trackIndex < 0 || trackIndex >= playList.length) {
        return "";
    }
    const trackId = playList[trackIndex].id;
    return `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${CLIENT_ID}`;
}

function formatTime(time) {
    return Math.floor(time / 60) + ':' + ('0' + (time % 60)).slice(-2);
}

function offsetLeft(element) {
    let curr = element;
    let offset = 0;
    while (curr) {
        offset += curr.offsetLeft;
        curr = curr.offsetParent;
    }
    return offset;
}
class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeeking: false,
            playMode: 'NORMAL'
        };
        // BIND EVENT-HANDLERs
        this.togglePlay = this.togglePlay.bind(this);
        this.handlePlayPrev = this.handlePlayPrev.bind(this);
        this.handlePlayNext = this.handlePlayNext.bind(this);

        //BIND MEDIAN EVENT HANDLERs

        this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleLoadStart = this.handleLoadStart.bind(this);

        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
        this.handleSeekMouseMove = this.handleSeekMouseMove.bind(this);
        this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
        this.handleSeekWithClick = this.handleSeekWithClick.bind(this);

        this.handleToggleRepeat = this.handleToggleRepeat.bind(this);
        this.handleToggleShuffle = this.handleToggleShuffle.bind(this);
    }


    componentDidMount() {
        // INITIALIZE PLAYLIST

        // REGISTER MEDIA EVENT HANDLERS
        const audioElement = this.audioElement;
        audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
        audioElement.addEventListener('loadStart', this.handleLoadStart, false);
        audioElement.addEventListener('ended', this.handlePlayNext, false);
    }

    componentDidUpdate(prevProps) {
        const audioElement = this.audioElement;
        if (!audioElement) {
            return;
        }
        const {isPlaying} = this.props;
        if (isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause()
        }
    }

    componentWillUnmount() {
        const audioElement = this.audioElement;
        audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.removeEventListener('timeupdate', this.timeupdate, false);
        audioElement.removeEventListener('loadStart', this.handleLoadStart, false);
        audioElement.removeEventListener('ended', this.handlePlayNext, false);

    }

    togglePlay() {
        this.props.toggleIsPlaying();
    }

    handlePlayPrev() {
        const {
            playingTrackIndex,
            playList
        } = this.props;

        let track_index;
        if (this.state.playMode === 'NORMAL') {
            track_index = (playingTrackIndex - 1 + playList.length) % playList.length;
        } else if (this.state.playMode === 'REPEAT') {
            track_index = playingTrackIndex;
        } else {
            track_index = (Math.random() * playList.length) ^ 0;
        }
        const track_id = playList[track_index].id;
        this.props.playTracks({track_index, track_id});
    }

    handlePlayNext() {
        const {
            playingTrackIndex,
            playList
        } = this.props;

        let track_index;
        if (this.state.playMode === 'NORMAL') {
            track_index = (playingTrackIndex + 1) % playList.length;
        } else if (this.state.playMode === 'REPEAT') {
            track_index = playingTrackIndex;
        } else {
            track_index = (Math.random() * playList.length) ^ 0;
        }
        const track_id = playList[track_index].id;
        this.props.playTracks({track_index, track_id});
    }

    // MEDIA EVENT HANDLERS
    handleLoadStart() {
        this.props.setDuration(0);
        this.props.setCurrentTime(0);
    }
    handleLoadedMetadata() {
        const audioElement = this.audioElement;
        // DISPATCH AN ACTION
        this.props.setDuration(Math.floor(audioElement.duration));
    }

    handleEnded() {
        // PLAY NEXT
        this.handlePlayNext();
    }

    handleTimeUpdate() {
        if (this.state.isSeeking) {
            return;
        }
        const audioElement = this.audioElement;
        const currentTime = Math.floor(audioElement.currentTime);
        if (currentTime === this.props.currentTime) {
            return;
        } else {
            this.props.setCurrentTime(currentTime);
        }
    }

    // DURATION BAR
    renderDurationBar() {
        const { currentTime, duration } = this.props;

        if (duration !== 0) {
            const width = currentTime / duration * 100;
            return (
                <div
                    className="player-seek-duration-bar"
                    style={{  width: `${width}%` , border: "1px solid red"}}
                >
                    <div
                        className="player-seek-handle"
                        onClick={this.handleMouseClick}
                        onMouseDown={this.handleSeekMouseDown}
                    >
                    </div>
                </div>
            );
        }

        return null;
    }

    handleMouseClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    bindSeekMouseEvents() {
        document.addEventListener('mousemove', this.handleSeekMouseMove);
        document.addEventListener('mouseup', this.handleSeekMouseUp);
    }

    unbindSeekMouseEvents() {
        document.removeEventListener('mousemove', this.handleSeekMouseMove);
        document.removeEventListener('mouseup', this.handleSeekMouseUp);
    }

    handleSeekMouseDown() {
        console.log('mouse down');
        this.bindSeekMouseEvents();
        this.setState({isSeeking: true});
    }

    handleSeekMouseMove(e) {
        console.log('moving');
        const seekBar = this.seekBar;
        let offset = e.clientX - offsetLeft(seekBar);
        offset = Math.max(offset, 0);
        let percent = offset / seekBar.offsetWidth;
        percent = Math.min(1, percent);
        this.props.setCurrentTime(Math.floor(percent * this.props.duration));
    }

    handleSeekMouseUp() {
        console.log('mouse up');
        if (!this.state.isSeeking) {
            return;
        }
        this.unbindSeekMouseEvents();
        const {currentTime} = this.props;
        this.setState({isSeeking: false}, function() {
            const audioElement = this.audioElement;
            audioElement.currentTime = currentTime;
        })
    }

    handleSeekWithClick(e) {
        const audioElement = this.audioElement;
        const percent = (e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth;
        const currentTime = Math.floor(percent * this.props.duration);
        console.log(percent, currentTime);
        this.props.setCurrentTime(currentTime);
        audioElement.currentTime = currentTime;
    }

    // END OF DURATION BAR

    // <<<--- TOGGLE REPEAT --->>>

    handleToggleRepeat() {
        if (this.state.playMode !== 'REPEAT') {
            this.setState({
                playMode: 'REPEAT'
            })
        } else {
            this.setState({
                playMode: 'NORMAL'
            })
        }
    }

    handleToggleShuffle() {
        if (this.state.playMode !== 'SHUFFLE') {
            this.setState({
                playMode: 'SHUFFLE'
            })
        } else {
            this.setState({
                playMode: 'NORMAL'
            })
        }
    }

    // <<<--- TOGGLE REPEAT END--->>>

    renderPlaylist() {
        const {playList} = this.props;
        return(
            <Playlist
                playList={playList}
            />
        )
    }


    render() {
        const {
            playingTrackIndex,
            playList,
            isPlaying,
            duration,
            currentTime
        } = this.props;
        const playingTrack = playList[playingTrackIndex] || {};
        const user = playingTrack.user || {};
        if (playingTrackIndex === -1 ) {

        }
        return (
            <div className={`player ${playingTrackIndex === -1 ? 'player-hidden' : ''}`}>
                <audio id="audio" ref={(audio) => this.audioElement = audio} src={getStreamUrl(playList, playingTrackIndex)}  />
                <div className="container">
                    <div className="player-main">
                        <div className="player-section player-info">
                            <img
                                alt=""
                                className="player-image"
                                src={playingTrack ? `${playingTrack.artwork_url || '/images/track-avatar.jpg'}` : ""}
                            />
                            <PlayerTrackTitle
                                trackId={playingTrack.id}
                                title={playingTrack.title}
                                userId={user.id}
                                username={user.username}
                            />

                        </div>
                        <div className="player-section">
                            <div
                                className="player-button"
                                onClick={this.handlePlayPrev}
                            >
                                <i className="fa fa-backward" aria-hidden="true"></i>
                            </div>

                            <div
                                className="player-button"
                                onClick={this.togglePlay}
                            >
                                <i className={isPlaying ? "fa fa-pause" : "fa fa-play"} aria-hidden="true"></i>
                            </div>

                            <div
                                className="player-button"
                                onClick={this.handlePlayNext}
                            >
                                <i className="fa fa-forward" aria-hidden="true"></i>
                            </div>
                        </div>


                        <div className="player-section player-seek">
                            <div className="player-seek-bar-wrap" onClick={this.handleMouseClick} onMouseDown={this.handleSeekWithClick}>
                                <div className="player-seek-bar" ref={(seekBar) => this.seekBar = seekBar}>
                                    {this.renderDurationBar()}
                                </div>
                            </div>

                            <div className="player-time">
                                <div>{formatTime(currentTime)} / {formatTime(duration)}</div>
                            </div>
                        </div>

                        <div className="player-section player-seek">
                            <div
                                className={`player-button ${(this.state.playMode === 'REPEAT' ? ' active' : '')}`}
                                onClick={this.handleToggleRepeat}
                            >
                                <i className="fa fa-repeat" />
                            </div>
                            <div
                                className={`player-button ${(this.state.playMode === 'SHUFFLE' ? ' active' : '')}`}
                                onClick={this.handleToggleShuffle}
                            >
                                <i className="fa fa-random" />
                            </div>
                            <Popout className="player-button top-right">
                                <i className="fa fa-list" />
                                {this.renderPlaylist()}
                            </Popout>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Player;