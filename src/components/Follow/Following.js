import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axiosInstance from '../../axiosInstance';
import {Container } from 'react-bootstrap'
import {UserCard} from '../User/AllUser'

function Following(props) {
    const [followingList,setFollowingList] = useState([]);
    const params = useParams();
    const username = params.username;
    
    useEffect(()=>{
        axiosInstance.get(`/api/user/${username}/following`)
        .then((response)=>{
            setFollowingList(response.data)
        })
        
    },[username,setFollowingList])
    return (
        <Container className="mt-5 text-center">
           <h3 className="mb-4">Following</h3>
            {
                followingList.length
                ?<div>
                    {   
                        followingList.map((following)=>{
                            let sameUser = false;
                            if(following.username === props.username){ 
                                sameUser=true;
                            }
                            let isFollowing=false;
                            if(props.following.find(item=>item.username===following.username)){
                                isFollowing=true;
                            }
                        return <UserCard 
                            name={following.name} 
                            username={following.username} 
                            isFollowing={isFollowing} 
                            sameUser={sameUser}
                            key={`following-${username}-${following.username}`} 
                        />
                        })
                    }
                </div>
                :<div>
                    <p>No Following</p>
                </div>
            } 
            
        </Container>
    )
}

export default Following
