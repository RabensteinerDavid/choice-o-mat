import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/startside.css'
import '@fontsource/poppins'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/200.css'
import fhLogo from '../../images/fh_ooe_logo.png'
import fhLogoLight from '../../images/fh_ooe_logo_light.png'
import '../../style/homepage.css'
import { resetResult } from '../../components/LoadQuestion'
import useWindowDimensions from '../../components/useWindowSize'
import NavBar from '../../components/NavBar'

function StartButton () {
  return (
    <div className='app-item centered-button'>
      <Link to='/questions/1' className='start-button' onClick={resetResult}>
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
  const { height, width } = useWindowDimensions()
  return width > height ? (
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
  ) : (
    <div className='app portrait'>
      <div className='app-item light'>
        <img
          className='fh-logo-light'
          src={fhLogoLight}
          alt='fhooe.logo'
          width='40%'
        />
      </div>
      <div className='hero-light'></div>
      <div className='app-item-text-wrapper'>
        <div className='app-item-text heading'>MTD oder DA?</div>
        <div className='app-item-text details'>
          Wir helfen dir bei deiner Entscheidung und bringen dich auf deinen
          richtigen Karrierepfad
        </div>
        <div className='app-item-button-wrapper'>
          <Link
            to='/questions/1'
            className='start-button-app-item'
            onClick={resetResult}
          >
            Jetzt Starten
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Startside
