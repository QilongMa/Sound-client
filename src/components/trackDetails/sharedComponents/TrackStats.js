import React from 'react';

export default function TrackStats(props) {
    // console.log(props);
    return (
        <div>
            <div className="song-stats">
                <span>
                    <i className="fa fa-heart"></i>
                    &nbsp;&nbsp;
                    <span>{props.likesCount}</span>
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                    <i className="fa fa-play"></i>
                    &nbsp;&nbsp;
                    <span>{props.playsCount}</span>
                </span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                    <i className="fa fa-comment"></i>
                    &nbsp;&nbsp;
                    <span>{props.commentsCount}</span>
                </span>
            </div>
            <div>
                {props.description}
            </div>
        </div>
    )
}
