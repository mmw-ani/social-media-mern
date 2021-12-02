import React, { useState,useEffect } from 'react'
import axiosInstance from '../../axiosInstance';
import {Link} from 'react-router-dom'
import {Button, Col,Container,Row} from 'react-bootstrap'

function AllUser(props) {
    const [users,setUsers] = useState([]);
    
    useEffect(()=>{
        const getUsers = async ()=>{
            const response = await axiosInstance('/api/users/')
            
            if(props.inMainScreen){
                
                setUsers(response.data.splice(0,5));
            }
            else{
                setUsers(response.data);
            }
        }
        getUsers()  
    },[setUsers,props.inMainScreen])

    return (
        <div className="text-center mt-3 mb-3 p-2">
            <h3>{props.inMainScreen?"New Users": "Users"}</h3> 
            {users.map(eachUser=>{
                return (
                    <UserCard 
                        key={`usercard-${eachUser.username}`}
                        id={eachUser.user_id} 
                        name={eachUser.name} 
                        username={eachUser.username}
                        isFollowing={eachUser.isFollowing}
                    />
                    
                )
            })}
        </div>
    )
}

function UserCard(props){

    const [follow,setFollow] = useState(props.isFollowing);
    const handleFollowButton = (e) =>{
        if(follow){
            setFollow(false)
            axiosInstance.get(`/api/user/${props.username}/unfollow/`)
        }else{
            setFollow(true);
            axiosInstance.get(`/api/user/${props.username}/follow/`)
            
        }
        setTimeout(()=>{window.location.reload()},300)
        
    }
        
    let nameOfUser = props.name.split(" ");
    nameOfUser = nameOfUser[0][0]+nameOfUser[1][0];
    nameOfUser = nameOfUser.toUpperCase();
    
    return(
        <Container>        
            <Row className="shadow mx-auto mt-4 p-3">
            <Col xs={2} className="text-center">
                <p className="homepage-image-box">
                    {nameOfUser}
                </p>
            </Col>
            <Col className="my-auto">
                <p className="mb-0">{props.name}</p>
                <Link to={`/user/${props.username}`}>@{props.username}</Link>
            </Col>
            {
                !props.sameUser && 
                <Col className="my-auto">
                    {
                        follow?
                            <Button variant="dark" onClick={handleFollowButton}>Following</Button>
                        :
                            <Button onClick={handleFollowButton} >Follow</Button>

                    }
                </Col>
            }
        </Row>
        </Container>

    )
}
export {AllUser, UserCard};