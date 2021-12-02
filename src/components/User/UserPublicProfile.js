import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import { Container, Spinner } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';
import { getDate } from '../../common';

function UserPublicProfile(props) {
    const params = useParams();
    const username = props.username||params.username;
    const [userDetails,setUserDetails] = useState("");
    const [errorUser,setErrorUser] = useState("");
    const [isLoading,setLoading]=useState(true);

    useEffect(()=>{
        axiosInstance.get(`/api/user/profile/${username}`)
        .then(response=>{
            setUserDetails(response.data)
            setLoading(false);
        })
        .catch((error)=>{
            
            setErrorUser(error.response.data);
            setLoading(false);
        })
        
    },[setUserDetails,setErrorUser,username,setLoading])

    if(isLoading){
        return(
            <div className="loading-spinner-style">
                <Spinner animation="border"  role="status" />
            </div>
        )
    }

    else{
    return (
        
        <Container className="mt-3 text-center">
            {errorUser ?
                <div class="alert alert-warning" role="alert">
                    {errorUser}
                    
                </div>
                :<div>
                    <p>@{userDetails.username}</p>
                    <h3>{userDetails.name}</h3>
                    <p>{userDetails.gender}</p>
                    <p className="d-inline">
                        {userDetails.followers.length} <Link to={`/user/${username}/followers`}>Followers</Link>
                        
                    </p>
                    <p className="d-inline ml-2">
                        {userDetails.following.length} <Link to={`/user/${username}/following`}>Following</Link>
                        
                    </p>
                    {
                        userDetails.posts && userDetails.posts.map((eachItem)=>{
                            return (<Post
                                key={eachItem._id} 
                                _id={eachItem._id}
                                post={eachItem.post}
                                username={eachItem.username}
                                posted_on={getDate(eachItem.posted_on)}
                            />
                            )
                        })
                    }
                </div>
            }
        </Container>
    )
}
}
function Post(props) {
    return (
        <div className="border border-light text-center rounded p-3 shadow m-5" key={props.post_id}>
            
            <Link to={`/posts/${props._id}`} className="te"> <p>{props.post}</p></Link>
            By&nbsp;<h4 className="d-inline">{props.username}</h4>
            <h6 className="m-2">{props.posted_on}</h6>
            
        </div>
    )
}



export default UserPublicProfile
