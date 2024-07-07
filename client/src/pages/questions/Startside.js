import React from 'react'
import { Link } from 'react-router-dom'
import '../../style/startside.css'
import '@fontsource/poppins'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/200.css'
import fhLogoLight from '../../images/fh_ooe_logo_light.png'
import '../../style/homepage.css'
import { resetResult } from '../../components/LoadQuestion'
import useWindowDimensions from '../../components/useWindowSize'
import { Player } from '@lottiefiles/react-lottie-player'

function StartButton () {
  return (
    <div className='app-item centered-button'>
      <Link to='/questions/1' className='start-button' onClick={resetResult}>
        Jetzt Starten
      </Link>
      <br></br>
      {/* <Link to='/question' className='add-question-button'>
        Add new Question
      </Link> */}
    </div>
  )
}

function Startside () {
  const { height, width } = useWindowDimensions()
  return width > height ? (
    <div className='app'>
      <div className='app-item'>
      <Player
          src='/lottie/landscape.json'
          className='fox-nav-startside'
          loop
          autoplay
          style={{
            height: '100%'
          }}
        />
      </div>
      <div className='app-item hero'>
        <h1 className='hero-heading'>MTD oder DA?</h1>
        <p className='hero-p'>
          Wir helfen dir bei deiner Entscheidung und bringen dich auf deinen
          richtigen Karrierepfad
        </p>
        <StartButton />
      </div>
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
        <Player
          src='/lottie/portrait.json'
          loop
          autoplay
          style={{
            width: '100%'
          }}
        />
      </div>
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
