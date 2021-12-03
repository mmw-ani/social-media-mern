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
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
            <NavLink className="navbar-brand" to="/">Thinkly</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <div className="navbar-nav ml-auto text-center">
                
                {userDetails ?<Button className="nav-link logout-button" onClick={logout}>Logout</Button>
                    :<div className=" d-sm-flex  text-center">
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
