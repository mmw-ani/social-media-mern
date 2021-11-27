import React, { useState,useEffect } from 'react'
import axiosInstance from '../../axiosInstance';
import {Link} from 'react-router-dom'

function AllUser() {
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axiosInstance('/api/users/')
        .then(response=>{
            setUsers(response.data);
        })
    },[])

    return (
        <div className="text-center">
            <h1>Users</h1> 
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
    return(
        <div className="shadow col-4 mx-auto mt-4 p-3">
            <p className="mb-1">{props.name}</p>
            <Link to={`/user/${props.username}`}>@{props.username}</Link>
        </div>
    )
}

export default AllUser
