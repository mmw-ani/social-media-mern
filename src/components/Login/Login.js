import React,{useState} from "react";
import {Button} from 'react-bootstrap'
import axiosInstance from "../../axiosInstance";
import { useNavigate,Navigate } from "react-router";
import "./index.css"
import Cookies from 'universal-cookie';



function Login(props) {
    const cookies = new Cookies();
    const [password,setPassword]= useState('');
    const [username,setUsername]= useState('');
    const [successResponse,setSuccessResponse] = useState('')
    const [validityError,setValidityError]=useState('');
    


    const navigate = useNavigate()
    const  handleSubmit = async (event)=>{
        setSuccessResponse("");
        setValidityError("");
        event.preventDefault();
        const paramters={
            username,
            password
        }
        axiosInstance.post('/api/login/',paramters).then((response)=>{
            console.log(response)
            const token = response.data.jwt;
            cookies.set('jwt',token,{path:'/'});
            
            axiosInstance.get("/api/user/")
            .then((response)=>{
                props.setUserLogged(response.data);
            });

            navigate('/')         
            setValidityError('');
        }).catch((error)=>{
            console.log(error.response)

            setValidityError(error.response.data);
                
        })
    };
    
    return (
        <div className="login-page">
            {props.userDetails && <Navigate to="/" replace={true} />}
            <form onSubmit={handleSubmit}>
                <input
                    value={username}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setUsername(e.target.value)}
                    type='text'
                    placeholder="Enter Username"
                /><br />
                
                
                <input
                    value={password}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setPassword(e.target.value)}
                    type='password'
                    placeholder="Enter password"
                /><br />
                

                {validityError && <p className="error-msg m-2">{validityError}</p>}
                {successResponse.length>0 && <p className="">{successResponse} </p> }
                <Button type="submit">Login</Button>
            </form>
            
        </div>
    )
}

export default Login
