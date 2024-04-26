import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/startside.css'
import '@fontsource/poppins'
import fhLogo from '../../images/fh_ooe_logo.png'
import '../../style/homepage.css'

function StartButton () {
  return (
    <div className='app-item centered-button'>
      <nav>
        <Link to='/questions/1' className='start-button'>
          Jetzt Starten
        </Link>
      </nav>
      <nav>
        <Link to='/question' className='start-button'>
          Add new Question
        </Link>
      </nav>
    </div>
  )
}

function Startside () {
  return (
    <div className='app'>
      <div className='app-item'>
        <img className='fh-logo' src={fhLogo} alt='fhooe.logo' width='20%' />
      </div>
      <div className='app-item hero'>
        <h1>MTD oder Da?</h1>
        <p>
          Wir helfen dir bei deiner Entscheidung und bringen dich auf deinen
          richtigen Karrierepfad{' '}
        </p>
        <StartButton />
      </div>
    </div>
  )
}

export default Startside
