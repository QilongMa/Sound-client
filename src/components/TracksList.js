import React, {Component} from 'react';
import {Link} from 'react-router';

import Track from './Track'

class TracksList extends Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.state = {
            isPlaying: false,
            gridLayout: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.handleScrollToTop = this.handleScrollToTop.bind(this);
        this.toggleGridLayout = this.toggleGridLayout.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScroll, false);
        this.props.getTracks();
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll, false);
    }

    handleClick(track) {
        // toggleIsPlaying
        if (track.track_id !== this.props.playingTrackId) {
            this.props.playTracks(track);
        } else {
            this.props.toggleIsPlaying();
        }
    }

    toggleLoading() {
        this.isLoading = !this.isLoading;
    }

    onScroll(event) {
        if (!this.props.next_href || this.isLoading) {
            return;
        }

        const th = 20;
        let scrollTop = event.srcElement.body.scrollTop;
        if (scrollTop >= document.documentElement.offsetHeight - window.innerHeight - th) {
            this.toggleLoading();
            this.props.loadMoreTracks(this.props.next_href, this.toggleLoading);
        }
    }

    handleScrollToTop() {
        window.scrollTo(0, 0);
    }

    toggleGridLayout() {
        this.setState((prevState) => {
            return {gridLayout: !prevState.gridLayout}
        })
    }

    render() {
        const {playingTrackId, isPlaying, playTracks, toggleIsPlaying} = this.props;
        const gridLayout = this.state.gridLayout;
        return (
            <div>
                {
                    this.props.tracksList.map((track, track_index) => {
                        const props = {playingTrackId, isPlaying, track, track_index, playTracks, toggleIsPlaying, gridLayout};
                        return(
                            <Track key={track_index} {...props} />
                        )
                    })
                }

                <div className="toggle-grid-layout" onClick={this.toggleGridLayout}>
                    <i className={gridLayout ? "fa fa-list" : "fa fa-th"}></i>


                </div>
                <div className="return-to-top" onClick={this.handleScrollToTop}>
                    <i className="fa fa-angle-up" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default TracksList;

