
import React from 'react';

import { Link } from "react-router-dom"


function NavBar(){
    
    return(
        <div>
            <nav className="navbar">
            <Link to="/">Shows</Link> 
            <Link to="/users">Users</Link>
            <Link to="/actors">Actors</Link>
            </nav>
        </div>
    );
}

export default NavBar;

