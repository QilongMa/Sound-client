import React from 'react';
import moment from 'moment';

export default function TrackComments(props) {
    let {comments} = props;
    if (comments.length === 0) {
        return <div></div>
    }

    function compare(a,b) {
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp)
            return 1;
        return 0;
    }

    comments = comments.sort(compare);

    const comment = comments.map(comment => {
        if (comment.timestamp === null) {
            comment.timestamp = 0;
        }
        let time = moment(comment.timestamp).format('mm:ss');
        return (
            <div className="comment" key={comment.id}>
                <div className="comment-image" style={{backgroundImage: `url(${comment.user.avatar_url})`}}></div>
                <div className="comment-info">
                    <div className="comment-comment">{comment.body}</div>
                    <div className="comment-username">{comment.user.username}</div>
                </div>
                <div className="comment-time">{time}</div>
            </div>
        )
    });
    return (
        <div className="sidebar">
            <div className="comments">
                <div className="comments-header">
                    <div className="comments-header-title">
                        Comments
                    </div>
                </div>
                <div className="sidebar-content">
                    {comment}
                </div>
            </div>
        </div>
    );
}
