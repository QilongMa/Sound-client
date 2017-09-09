import React, { Component } from 'react';

class TrackDetails extends Component {
    render() {
        const {
            title,
            trackId,
            userId,
            username
        } = this.props;

        return (
            <div className="song-card-details">
                <div className="song-card-title">
                    {title}
                </div>
                <div className="song-card-user-username">
                    {username}
                </div>
            </div>
        )
    }

}


export default TrackDetails;