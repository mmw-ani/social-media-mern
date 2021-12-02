import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axiosInstance from '../../axiosInstance';
import {Container } from 'react-bootstrap'
import {UserCard} from '../User/AllUser'

function Followers(props) {
    const [followerList,setFollowerList] = useState([]);
    const params = useParams();
    const username = params.username;
    
    useEffect(()=>{
        axiosInstance.get(`/api/user/${username}/followers`)
        .then((response)=>{
            setFollowerList(response.data)
        })
        
    },[username,setFollowerList])
    return (
        <Container className="mt-5 text-center">
           <h3 className="mb-4">Followers</h3> 
            {followerList.length
            ?
                <div>{
                    followerList.map((follower)=>{
                        let isFollowing = false;
                        let sameUser = false;
                        if(follower.username === props.username){ 
                            sameUser=true;
                        }
                        if(props.following.find(item => item.username === follower.username)){ 
                            isFollowing=true;
                        }
                        return <UserCard 
                        name={follower.name} 
                        username={follower.username} 
                        sameUser={sameUser}
                        isFollowing={isFollowing}
                        key={`follower-${username}-${follower.username}`} 
                        
                        />
                    })}
                </div>
            :<div>
                <p>No Followers</p>
            </div>
            }
        
        </Container>
    )
}

export default Followers
