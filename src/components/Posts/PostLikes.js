import React,{useEffect,useState} from 'react'
import {Container} from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'
import {UserCard} from '../User/AllUser';

function PostLikes(props) {
    const params = useParams();
    const postId = params.postId ;
    const [likedBy,setLikes] = useState([]);
    
    
    useEffect(()=>{
        
        axiosInstance.get(`/api/post/${postId}/allLikes`)
        .then((response)=>{
            setLikes(response.data);
        })
    },[setLikes,postId])
    return (
        <Container className="mt-5 text-center">
            <h3>Likes</h3>
            <p className="text-left"><Link  to={`/posts/${postId}`}>Back</Link></p>
            {
                likedBy.map((like)=>{
                    let sameUser = false;
                            if(following.username === props.username){ 
                                sameUser=true;
                            }
                            let isFollowing=false;
                            if(props.following.find(item=>item.username===following.username)){
                                isFollowing=true;
                            }

                    return <UserCard 
                        sameUser={sameUser}
                        isFollowing={isFollowing}
                        name={like.name} 
                        username={like.username} 
                        key={`${postId}-likes-${like.username}`} />
                })
            }
        </Container>
    )
}

export default PostLikes
