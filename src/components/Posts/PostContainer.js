import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./index.css"
import {Col, Row} from 'react-bootstrap'
import {FaComments} from 'react-icons/fa'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import axiosInstance from '../../axiosInstance'
import { getDate } from '../../common'

function PostContainer(props) {
    
    const [isLiked,setLikedButton] = useState(false);
    const [comment,setComment] = useState("");

    useEffect(()=>{
        setLikedButton(props.isLiked)
    },[setLikedButton,props])

    
    const handleLikeClick = async (e) =>{
        if(isLiked){
            setLikedButton(false)
            await axiosInstance.get(`/api/post/${props.postId}/unlike`).catch((e)=>console.log(e));
            
        }
        else{
            setLikedButton(true)
            await axiosInstance.get(`/api/post/${props.postId}/like`).catch((e)=>console.log(e));
            
        }
        props.likedButtonTrigger()
    }
    
    const setCommentText = (e)=>{
        setComment(e.target.value)
    }
    const handleCommentClickButton = async (e) => {
        e.preventDefault();
        if(comment!==""){
        const parameter = {
            comment:comment
        }
        console.log(parameter);
        await axiosInstance.post(`/api/post/${props.postId}/comment`,parameter)
        props.likedButtonTrigger();

        setComment("");
        }
    }
    return (
        <div>
            <div className="post-by-id-container mb-3" >
                
                <Link to={`/user/${props.username}`} className="user-box mr-2" >@<span>{props.username}</span></Link>
                	
                    &bull;<p className="mb-0 ml-2 post-posted-on d-inline">{getDate(props.posted_on)}</p>
                {props.link?<Link to={`/posts/${props.postId}`} className="post-content-with-link"> <p className="mb-0">{props.post}</p></Link>:<p className="post-content">{props.post}</p>}
                
                <div className="d-flex flex-row">
                    <button onClick={handleLikeClick} className="post-button-container">
                        {isLiked?<AiFillHeart className="likedbutton post-buttons" /> : <AiOutlineHeart className="post-buttons" />}
                        
                    </button>
                    <Link to={`/posts/${props.postId}/likes`} className="post-like-link-container">{props.likedBy}</Link>
                    <button className="post-button-container">
                        <FaComments className="post-buttons" />
                        <p className="post-extra-details d-inline">{props.commentedBy}</p>
                    </button>
                </div>
                
                <form onSubmit={handleCommentClickButton}>
                    <Row className="mt-2 ml-2">
                        <Col xs={9} className="text-right" >
                            <div className="post-field-input mt-2">
                                <textarea
                                    rows={1}
                                    className="form-control"
                                    placeholder="Write your comment here!"
                                    onChange={setCommentText}
                                    value={comment}
                                />
                            </div>
                        </Col>
                        <Col xs={3} className="mt-2 text-left">
                            <button className="text-primary post-comment-button py-1" type="submit">Comment</button>
                        </Col>
                    </Row>
                </form>
                <div className="mt-3">
                    {props.comments.map((item)=>{
                        return(
                            <div className="comment-box" key={`comment-${item._id}`}>
                                <Link to={`/user/${item.username}`} className="user-box mr-2" >@<span>{item.username}</span></Link>
                                &bull;<p className="mb-0 ml-2 post-posted-on d-inline">{getDate(item.commented_at)}</p>
                                    
                                <p className="mb-0">
                                    {item.comment}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default PostContainer
