import React, {Component} from 'react';

import '../../style/nav-bar.scss';
import '../../style/trackslist.scss';
import '../../style/player.scss';
import '../../style/trackscomponent.scss';
import '../../style/track.scss';

import TracksList from '../containers/TracksListContainer';
import Player from '../containers/PlayerContainer';

class Stream extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="parent-container">
                <br/>
                <div className="body-container">
                    <TracksList />
                </div>

            </div>

        );
    }
}


export default Stream;

