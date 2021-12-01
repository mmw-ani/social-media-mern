import React,{useState,useEffect} from 'react'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Homepage from "./components/Homepage/Homepage";
import Posts from "./components/Posts/Posts";
import Navbar from './components/Navbar/Navbar';



import axiosInstance from './axiosInstance';
import {Spinner} from 'react-bootstrap';
import AllUser from './components/User/AllUser';
import UserPublicProfile from './components/User/UserPublicProfile';


function App() {
  const [userDetails,setUserDetails] = useState("");
  const [isLoading,setLoading]=useState(true);
  

  function setUserLogged(response){
    setUserDetails(response)
  }

  const getUserDetails = async ()=>{
    await axiosInstance.get("/api/user/")
      .then((response)=>{
          setUserDetails(response.data);
      });
      setLoading(false);
  }
  useEffect(()=>{
    getUserDetails()
  },[setUserDetails,setLoading])

  if(isLoading){
      return (
        <div className="loading-spinner-style">
          <Spinner animation="border"  role="status" />
        </div>
        
    )
  }
  else{
    return (
      <div>
        
        
          <Router>
          <Navbar userDetails={userDetails} setUserLogged={setUserLogged} />
            
                  <Routes>
                    
                    <Route path="/register" element={<Register  />}/>
                    <Route path="/login" element={<Login userDetails={userDetails} getUserDetails={getUserDetails} />}/>
                    <Route path="/" element={<Homepage userDetails={userDetails}/>} />
                    <Route path="/posts/:postId" element={<Posts />} />
                    <Route path="/users/" element={<AllUser />} />
                    <Route path="/user/:username" element={<UserPublicProfile />} />
                </Routes>
                
          </Router>

      </div>
    );
  }
}


export default App;
