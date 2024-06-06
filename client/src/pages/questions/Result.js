import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { getResultLocalStorage } from '../../components/LoadQuestion'
import '../../style/questions/result.css'
import { Tooltip } from 'react-tooltip'

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

  const isMtdLarger = result && result.mtd >= result.da

  return (
    <div className={`result-body ${isMtdLarger ? 'mtd-first' : 'da-first'}`}>
      <div className='result-nav-wrapper'>
        <Link to='/' className='nav-link cross-result'></Link>
      </div>

      {result && (
        <>
          {result.mtd >= result.da ? (
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
                <a className='percentage start' id='mtd-tooltip'>
                  {result.mtd}%
                </a>

                <Tooltip className='tooltip' anchorSelect='#mtd-tooltip'>
                  Du stimmst zu {result.mtd}% mit DA überein
                </Tooltip>
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
                <a className='percentage end' id='da-tooltip'>
                  {result.da}%
                </a>

                <Tooltip className='tooltip' anchorSelect='#da-tooltip'>
                  Du stimmst zu {result.da}% mit DA überein{' '}
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <div className='da bigger'>
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
                <a className='percentage start' id='da-tooltip'>
                  {result.da}%
                </a>

                <Tooltip className='tooltip' anchorSelect='#da-tooltip'>
                  Du stimmst zu {result.da}% mit MTD überein
                </Tooltip>
              </div>
              <div className='mtd smaller'>
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
                <a className='percentage end' id='mtd-tooltip'>
                  {result.mtd}%
                </a>

                <Tooltip className='tooltip' anchorSelect='#mtd-tooltip'>
                  Du stimmst zu {result.mtd}% mit MTD überein
                </Tooltip>
              </div>
            </>
          )}

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
