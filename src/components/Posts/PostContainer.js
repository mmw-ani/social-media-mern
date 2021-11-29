import React from 'react'
import {Link} from 'react-router-dom'
import "./index.css"

function PostContainer(props) {
    const month = []
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    let posted_on = props.posted_on;
    posted_on = new Date(posted_on);
    
    const res = posted_on.getDate()+"-"+month[posted_on.getMonth()]+"-"+posted_on.getFullYear();
    
    return (
        <div>
            <div className="post-by-id-container">
                
                <Link to={`/user/${props.username}`} className="user-box mr-2" >@<span>{props.username}</span></Link>
                	
                    &bull;<p className="mb-0 ml-2 post-posted-on d-inline">{res}</p>
                {props.link?<Link to={`/posts/${props.postId}`} className="post-content-with-link"> <p className="mb-0">{props.post}</p></Link>:<p className="post-content">{props.post}</p>}
                

                
                
            </div>
            <hr />
        </div>
    )
}

export default PostContainer
