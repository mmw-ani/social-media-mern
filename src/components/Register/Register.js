import React,{useState} from "react";
import {Button, Container} from 'react-bootstrap'
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import "./index.css"

function Register() {
    const [firstName,setFirstName]= useState('');
    const [lastName,setLastName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [gender,setGender]= useState('Male');
    const [username,setUsername]= useState('');
    const [error,setError] = useState([]);
    const [successResponse,setSuccessResponse] = useState('')
    const [validityError,setValidityError]=useState('');

    async function handleSubmit (event){
        setSuccessResponse('');
        setValidityError('');
        event.preventDefault();
        const paramters={
            firstName,
            lastName,
            email,
            password,
            username,
            gender
        }
        axiosInstance.post('/api/register',paramters).then((response)=>{
            console.log(`${response.data}`);
            setSuccessResponse(response.data);
        }).catch((error)=>{
            
            let allError = error.response.data.errors;
            if(allError!==undefined){
                setError(allError);
            }else{
                setError([]);
                allError = error.request.response;
                if(allError!==undefined)
                    setValidityError(allError);
                else{
                    setValidityError('');
                }
            }

        })
    };
    function onGenderRadioChange(event){
        setGender(event.target.value)
    }
    return (
        <Container className="mt-4 registration-form">
            <h3 className="text-center text-primary mb-">Register Yourself</h3>
            <form onSubmit={handleSubmit}>


                <label htmlFor="inputFirstName" className="font-weight-bold">First Name</label>
                <input
                    id="inputFirstName"
                    value={firstName}
                    className="form-control input-field"
                    onChange={(e)=>setFirstName(e.target.value)}
                    type='text'
                    required = {true}
                    placeholder="Enter your first name"
                /><br />
                {error.find((e)=>e.param==='firstName') && <p className="text-danger text-center">{error.find((e)=>e.param==='firstName').msg}</p>}
                
                <label htmlFor="inputLastName" className="font-weight-bold">Last Name</label>
                <input
                    id="inputLastName"
                    value={lastName}
                    className="form-control input-field "
                    onChange={(e)=>setLastName(e.target.value)}
                    type='text'
                    placeholder="Enter your last name"
                /><br />
                {error.find((e)=>e.param==='lastName') && <p className="text-danger text-center">{error.find((e)=>e.param==='lastName').msg}</p>}
                
                <label htmlFor="inputEmail" className="font-weight-bold">Email</label>
                <input
                    id="inputEmail"
                    value={email}
                    className="form-control input-field "
                    onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    required
                    placeholder="Enter your email id"
                /><br />
                {error.find((e)=>e.param==='email') && <p className="text-danger text-center">{error.find((e)=>e.param==='email').msg}</p>}
                {validityError.indexOf('Email')!==-1 && <p className="text-danger text-center">{validityError}</p>}
                
                <label htmlFor="inputUsername" className="font-weight-bold">Username</label>
                <input
                    id="inputUsername"
                    value={username}
                    className="form-control input-field"
                    onChange={(e)=>setUsername(e.target.value)}
                    type='text'
                    required = {true}
                    placeholder="Enter Username"
                /><br />
                {error.find((e)=>e.param==='username') && <p className="text-danger text-center">{error.find((e)=>e.param==='username').msg}</p>}
                {validityError.indexOf('Username')!==-1 && <p className="text-danger text-center">{validityError}</p>}
                <label htmlFor="inputPassword" className="font-weight-bold">Password</label>
                <input
                    id="inputPassword"
                    value={password}
                    className="form-control input-field "
                    onChange={(e)=>setPassword(e.target.value)}
                    type='password'
                    required = {true}
                    placeholder="Enter password"
                /><br />
                {error.find((e)=>e.param==='password') && <p className="text-danger text-center">{error.find((e)=>e.param==='password').msg}</p>}
                <label htmlFor="gender" className="font-weight-bold">Gender</label>
                <input type="radio"
                    id="male" 
                    name="gender" 
                    value="Male" 
                    className="ml-3 mb-3"
                    onChange={onGenderRadioChange}
                    checked={gender==='Male'}
                />
                <label htmlFor="male" className="ml-1 mb-3">Male</label>

                <input type="radio" 
                    id="female" 
                    name="gender" 
                    value="Female"  
                    className="ml-3 mb-3"
                    onChange={onGenderRadioChange} 
                    checked={gender==='Female'}
                />
                <label htmlFor="female" className="ml-1 mb-3 text-dark">Female</label>

                <br />
                {error.find((e)=>e.param==='gender') && <p className="text-danger text-center">{error.find((e)=>e.param==='gender').msg}</p>}
                <div className="text-center">
                    <Button type="submit" className="btn btn-dark w-75">Submit</Button>
                </div>
            </form>
            {successResponse && <div class="alert alert-success" role="alert">{successResponse}</div>}
            <p className="text-center mt-3 mb-0">Already have an account? <Link to="/login">Login</Link></p>
        </Container>
    )
}

export default Register
