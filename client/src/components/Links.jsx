import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/links.css'

class Links extends Component {
  render () {
    return (
      <nav>
        <div className='top-header'>
        <Link to="/" className='nav-link cross'></Link>
          <Link /*to="/movies/list"*/ className='nav-link'>?</Link>
        </div>
      </nav>
      
    )
  }
}

export default Links
