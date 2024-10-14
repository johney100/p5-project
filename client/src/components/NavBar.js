
import React from 'react';

import { Link } from "react-router-dom"


function NavBar(){
    
    return(
        <div>
            <nav className="navbar">
            <Link class="navbar-links" to="/">Stories</Link>
            <Link class ="navbar-link"s to="/users">Users</Link>
            <Link class="navbar-links" to="/authors">Authors</Link>
            <Link className="navbar-links" to="/ai">AI</Link>
            </nav>
        </div>
    );
}

export default NavBar;

