import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { getResultLocalStorage } from '../../components/LoadQuestion'
import '../../style/questions/result.css'

function Result () {
  const [result, setResult] = useState(null)

  useEffect(() => {
    async function fetchResult () {
      try {
        const result = await getResultLocalStorage()
        setResult(result)
      } catch (error) {
        console.error('Error fetching result:', error)
      }
    }

    fetchResult()
  }, [])

  function MoreInformation () {
    return (
      <div className='more-information-wrapper'>
        <Link to='/questions/1' className='more-information'>
          Jetzt mehr erfahren
        </Link>
      </div>
    )
  }

  return (
    <div className='result-body'>
      <div className='result-nav-wrapper'>
        <Link to='/' className='nav-link cross-result'></Link>
      </div>

      {result && (
        <>
          <div className='mtd bigger'>
            <div className='mtd-wrapper'>
              <h1>MTD</h1>
              <p className='result-text'>
                Lorem ipsum dolor sit amet consectetur. Massa leo blandit
                tincidunt aenean sit egestas. Est rhoncus sed habitasse sit.
                Imperdiet porttitor tempor imperdiet sit quam tempus ornare.
                Fermentum nibh a quisque ullamcorper amet.
              </p>
              <MoreInformation />
            </div>
            <p className='percentage start'>{result.mtd}%</p>
          </div>
          <div className='da smaller'>
            <div className='da-wrapper'>
              <h1>DA</h1>
              <p className='result-text'>
                Lorem ipsum dolor sit amet consectetur. Massa leo blandit
                tincidunt aenean sit egestas. Est rhoncus sed habitasse sit.
                Imperdiet porttitor tempor imperdiet sit quam tempus ornare.
                Fermentum nibh a quisque ullamcorper amet.
              </p>
              <MoreInformation />
            </div>
            <p className='percentage end'>{result.da}%</p>
          </div>
          <Player
            src='/lottie/result-fox.json'
            className='result-fox'
            loop
            autoplay
            style={{
              height: '200px',
              width: '200px'
            }}
          />
        </>
      )}
    </div>
  )
}

export default Result
