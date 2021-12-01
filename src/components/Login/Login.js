import React,{useState} from "react";
import {Button, Container} from 'react-bootstrap'
import axiosInstance from "../../axiosInstance";
import { useNavigate,Navigate } from "react-router";
import "./index.css"

function Login(props) {
    
    const [password,setPassword]= useState('');
    const [username,setUsername]= useState('');
    const [successResponse,setSuccessResponse] = useState('')
    const [validityError,setValidityError]=useState([]);
    
    const navigate = useNavigate()
    const  handleSubmit = async (event)=>{
        event.preventDefault();
        if(username!==""&&password!==""){
        setSuccessResponse("");
        setValidityError("");
        
        const paramters={
            username,
            password
        }
        axiosInstance.post('/api/login/',paramters).then((response)=>{
            const token = response.data.jwt;
            localStorage.setItem('jwt',token)
            
            props.getUserDetails();
            navigate('/')       
            setSuccessResponse('Logged In')  
            setValidityError('');
        }).catch((error)=>{
            
            setValidityError(error.response.data);
                
        })}
        else{
            setValidityError("Enter Username & Password");
        }
    };
    
    return (
        <Container className=" mt-5 shadow registration-form">
            {props.userDetails && <Navigate to="/" replace={true} />}
            <h3 className="text-center text-primary">Login</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputUsername font-weight-bold">Username</label>
                <input
                    id="inputUsername"
                    value={username}
                    className="form-control input-field"
                    onChange={(e)=>setUsername(e.target.value)}
                    type='text'
                    placeholder="Enter your username"
                /><br />
                
                <label htmlFor="inputLastName">Password</label>
                <input
                    value={password}
                    className="form-control input-field"
                    onChange={(e)=>setPassword(e.target.value)}
                    type='password'
                    placeholder="Enter your password"
                /><br />

                {validityError && <p className="text-danger text-center">{validityError}</p>}
                {successResponse.length>0 && <p className="">{successResponse} </p> }
                <div className="text-center my-3">
                <Button type="submit" className="btn-dark w-75">Login</Button>
                </div>
            </form>
            
        </Container>
    )
}

export default Login
