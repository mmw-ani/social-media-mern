import React, { useState,useEffect } from 'react'
import axiosInstance from '../../axiosInstance';
import {Link} from 'react-router-dom'
import {Col,Row} from 'react-bootstrap'

function AllUser(props) {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axiosInstance('/api/users/')
        
        .then(response=>{
            if(props.inMainScreen){
                const fiveUsers = response.data.splice(0,5);

                setUsers(fiveUsers);
            }
            else{
                setUsers(response.data);
            }
        })
    },[setUsers,props])

    return (
        <div className="text-center mt-3 mb-3">
            <h1>{props.inMainScreen?"New Users": "Users"}</h1> 
            {users.map(eachUser=>{
                return (
                    <UserCard 
                        key={eachUser.user_id}
                        id={eachUser.user_id} 
                        name={eachUser.name} 
                        username={eachUser.username}
                    />
                    
                )
            })}
        </div>
    )
}

function UserCard(props){
    
    let nameOfUser = props.name.split(" ");
    nameOfUser = nameOfUser[0][0]+nameOfUser[1][0];
    nameOfUser = nameOfUser.toUpperCase();
    
    return(
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
        </Row>
    )
}

export default AllUser
