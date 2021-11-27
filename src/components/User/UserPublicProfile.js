import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import axiosInstance from '../../axiosInstance';

function UserPublicProfile() {
    const params = useParams();
    const username = params.username;
    const [userDetails,setUserDetails] = useState("");
    const [errorUser,setErrorUser] = useState("");

    useEffect(()=>{
        axiosInstance.get(`/api/user/profile/${username}`)
        .then(response=>{
            setUserDetails(response.data)
            
        })
        .catch((error)=>{
            
            setErrorUser(error.response.data);
        })
        
    },[setUserDetails,setErrorUser,username])

    if(errorUser){
        return(
            <div className="m-5 ">

                {errorUser}
            </div>
        )
    }
    else{
    return (
        <div className="mt-3 text-center">
            <p>@{userDetails.username}</p>
            <h3>{userDetails.name}</h3>
            <p>{userDetails.gender}</p>

            {
                userDetails.posts && userDetails.posts.map((eachItem)=>{
                    return (<Post
                        key={eachItem._id} 
                        _id={eachItem._id}
                        post={eachItem.post}
                        username={eachItem.username}
                        posted_on={eachItem.posted_on}
                    />
                    )
                })
            }
        </div>
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
