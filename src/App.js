import React,{useState,useEffect} from 'react'
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Homepage from "./components/Homepage/Homepage";
import Posts from "./components/Posts/Posts";
import Navbar from './components/Navbar/Navbar';



import axiosInstance from './axiosInstance';
import {Spinner} from 'react-bootstrap';
import {AllUser} from './components/User/AllUser';
import UserPublicProfile from './components/User/UserPublicProfile';
import PostLikes from './components/Posts/PostLikes';
import Followers from './components/Follow/Followers';
import Following from './components/Follow/Following';

function App() {
  const [userDetails,setUserDetails] = useState("");
  const [isLoading,setLoading]=useState(true);
  

  function setUserLogged(response){
    setUserDetails(response)
  }

  const getUserDetails = ()=>{
    axiosInstance.get("/api/user/")
      .then((response)=>{
        setLoading(false);
          setUserDetails(response.data);
      })
      .catch((e)=>{
        setLoading(false)
      })
  }
  useEffect(()=>{
    getUserDetails()
  },[setUserDetails,setLoading])

  function followButtonTriggered(){
    getUserDetails();
  }
  
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
                    <Route path="/user/:username/" element={<UserPublicProfile />} />
                    <Route path="/user/:username/followers" element={<Followers following={userDetails.following} username={userDetails.username} followButtonTriggered={followButtonTriggered} />} />
                    <Route path="/user/:username/following" element={<Following following={userDetails.following} username={userDetails.username} followButtonTriggered={followButtonTriggered} />} />
                    <Route path="/posts/:postId/likes" element={<PostLikes />} />
                    <Route path="/profile" element={<UserPublicProfile username={userDetails.username} />} />
                </Routes>
                
          </Router>

      </div>
    );
  }
}


export default App;
