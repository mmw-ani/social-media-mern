import React from 'react'
import {Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

function Navbar(props) {
    const userDetails = props.userDetails
    const logout=()=>{
        localStorage.removeItem('jwt','');
        props.setUserLogged("")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
            <NavLink className="navbar-brand" to="/">Twitter</NavLink>
            
            <div className="collapse navbar-collapse">
                <div className="navbar-nav ml-auto">
                
                {userDetails ?<Button className="nav-link logout-button" onClick={logout}>Logout</Button>
                    :<div className="d-flex ">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </div>
                }
                
                
                <NavLink className="nav-link " to="/profile">Hello {userDetails?userDetails.username:"Guest!"}</NavLink>
                </div>
            </div>
            </div>
        </nav>
    )
    
}

export default Navbar
