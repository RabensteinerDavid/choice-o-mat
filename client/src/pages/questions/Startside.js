import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/startside.css'
import '@fontsource/poppins'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/200.css'
import fhLogo from '../../images/fh_ooe_logo.png'
import '../../style/homepage.css'

function StartButton () {
  return (
    <div className='app-item centered-button'>
      <Link to='/questions/1' className='start-button'>
        Jetzt Starten
      </Link>
      <br></br>
      <Link to='/question' className='add-question-button'>
        Add new Question
      </Link>
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
        <h1 className='hero-heading'>MTD oder DA?</h1>
        <p className='hero-p'>
          Wir helfen dir bei deiner Entscheidung und bringen dich auf deinen
          richtigen Karrierepfad
        </p>
        <StartButton />
      </div>
      <div className='background-image'></div>
    </div>
  )
}

export default Startside
