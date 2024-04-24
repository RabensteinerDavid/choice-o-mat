import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/links.css';

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='top-header'> 
                <Link to="/" className="nav-link">X</Link>
                <Link /*to="/movies/list"*/ className="nav-link">?</Link></div>
            </React.Fragment>
        );
    }
}

export default Links;
