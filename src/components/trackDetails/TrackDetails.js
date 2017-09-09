import React, {Component} from 'react';

import CurrentTrack from "./CurrentTrack";
import TrackComments from './TrackComments';
import RelatedTracks from '../../containers/RelatedTracksContainer';


class TrackDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.params.id;
        this.props.getTrackDetails(id);
        this.props.getComments(id);
    }

    componentWillUnmount() {
        this.props.resetComponent();
    }


    render() {
        let {currentTrack, relatedTracks, playTracks, isPlaying, playingTrackId} = this.props;
        if (!currentTrack.id) {
            return <div></div>
        }
        return (

            <div className="track-details-container">
                <div className="col-7-10">
                    <div className="song card">
                        <CurrentTrack {...this.props} />
                    </div>
                    <RelatedTracks tracks={relatedTracks} playTracks={this.props.playTracks} />
                </div>
                <div className="col-3-10">
                    <TrackComments className="float-right" comments={this.props.comments}/>
                </div>
            </div>

        )
    }
}

export default TrackDetails;

