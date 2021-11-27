import React from 'react'
import {Link} from 'react-router-dom'
import "./index.css"

function PostContainer(props) {
    let posted_on = props.posted_on;
    posted_on = new Date(posted_on);
    posted_on = posted_on.toString().split("GMT")[0]
    return (
        <div className="post-by-id-container">
            
            <Link to={`/user/${props.username}`} className="user-box" >@<span>{props.username}</span></Link>
            
            {props.link?<Link to={`/posts/${props.postId}`} className="post-content-with-link"> <p>{props.post}</p></Link>:<h4 className="post-content">{props.post}</h4>}
            <p className="mb-0 post-posted-on">{posted_on}</p>

            
            
        </div>
    )
}

export default PostContainer
