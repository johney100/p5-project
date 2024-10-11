
import React from 'react';

import { Link } from "react-router-dom"


function NavBar(){
    
    return(
        <div>
            <nav className="navbar">
            <Link to="/">Stories</Link>
            <Link to="/users">Users</Link>
            <Link to="/authors">Authors</Link>
            <Link to="/ai">AI</Link>
            </nav>
        </div>
    );
}

export default NavBar;

