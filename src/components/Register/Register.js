import React,{useState} from "react";
import {Button} from 'react-bootstrap'
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
        <div className="mt-5 ml-auto text-center">
            
            <form onSubmit={handleSubmit}>
                <input
                    value={firstName}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setFirstName(e.target.value)}
                    type='text'
                    placeholder="Enter First Name"
                /><br />
                {error.find((e)=>e.param==='firstName') && <p className="error-msg">{error.find((e)=>e.param==='firstName').msg}</p>}
                <input
                    value={lastName}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setLastName(e.target.value)}
                    type='text'
                    placeholder="Enter Last Name"
                /><br />
                {error.find((e)=>e.param==='lastName') && <p className="error-msg">{error.find((e)=>e.param==='lastName').msg}</p>}
                
                <input
                    value={email}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    required
                    placeholder="Enter Email"
                /><br />
                {error.find((e)=>e.param==='email') && <p className="error-msg">{error.find((e)=>e.param==='email').msg}</p>}
                {validityError.indexOf('Email')!==-1 && <p className="error-msg">{validityError}</p>}
                <input
                    value={username}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setUsername(e.target.value)}
                    type='text'
                    placeholder="Enter Username"
                /><br />
                {error.find((e)=>e.param==='username') && <p className="error-msg">{error.find((e)=>e.param==='username').msg}</p>}
                {validityError.indexOf('Username')!==-1 && <p className="error-msg">{validityError}</p>}
                <input
                    value={password}
                    className="m-2 form-control w-50 ml-auto mr-auto"
                    onChange={(e)=>setPassword(e.target.value)}
                    type='password'
                    placeholder="Enter password"
                /><br />
                {error.find((e)=>e.param==='password') && <p className="error-msg">{error.find((e)=>e.param==='password').msg}</p>}
                <input type="radio"
                    id="male" 
                    
                    name="gender" 
                    value="Male" 
                    onChange={onGenderRadioChange}
                    checked={gender==='Male'}
                />
                <label htmlFor="male">Male</label>
                <input type="radio" 
                    id="female" 
                    name="gender" 
                    value="Female"  
                    onChange={onGenderRadioChange} 
                    checked={gender==='Female'}
                />
                <label htmlFor="female">Female</label>
                <br />
                {error.find((e)=>e.param==='gender') && <p className="error-msg">{error.find((e)=>e.param==='gender').msg}</p>}
                <Button type="submit">Submit</Button>
            </form>
            {successResponse && <p className="success">{successResponse}</p>}
        </div>
    )
}

export default Register
