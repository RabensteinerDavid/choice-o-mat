import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { getResultLocalStorage } from '../../components/LoadQuestion'
import '../../style/questions/result.css'
import { Tooltip } from 'react-tooltip'
import { getResults } from '../../api'

function Result () {
  const [result, setResult] = useState(null)
  const [resultTextMtd, setResultTextMtd] = useState('')
  const [resultTextDa, setResultTextDa] = useState('')

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

  useEffect(() => {
    const fetchDataQuestionTypes = async () => {
      try {
        const response = await getResults()

        let mtdInRange = false
        let daInRange = false

        response.data.data.forEach(element => {
          const rangeMin = parseInt(element.range.split('-')[0])
          const rangeMax = parseInt(element.range.split('-')[1])

          if (result && result.mtd) {
            if (rangeMin <= result.mtd && result.mtd <= rangeMax) {
              setResultTextMtd(element.textMtd)
              mtdInRange = true
            }
          }

          if (result && result.da) {
            if (rangeMin <= result.da && result.da <= rangeMax) {
              setResultTextDa(element.textDa)
              daInRange = true
            }
          }
        })

        if (!mtdInRange || !result.mtd) {
          setResultTextMtd(
            'There is an error with the MTD value or it is not in range'
          )
        }

        if (!daInRange || !result.da) {
          setResultTextDa(
            'There is an error with the DA value or it is not in range'
          )
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }
    fetchDataQuestionTypes()
  }, [result])

  function MoreInformationDa () {
    return (
      <div className='more-information-wrapper'>
        <Link
          to={process.env.REACT_APP_BASE_URI_DA}
          className='more-information'
        >
          Jetzt mehr erfahren
        </Link>
      </div>
    )
  }

  function MoreInformationMtd () {
    return (
      <div className='more-information-wrapper'>
        <Link
          to={process.env.REACT_APP_BASE_URI_MTD}
          className='more-information'
        >
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
          {result.mtd > result.da ? (
            <>
              <div className='mtd bigger'>
                <div className='mtd-wrapper'>
                  <h1>MTD</h1>
                  <p className='result-text'>{resultTextMtd}</p>
                  <MoreInformationMtd />
                </div>
                <a className='percentage start' id='mtd-tooltip'>
                  {!isNaN(result.mtd) ? `${result.mtd}%` : ''}
                </a>

                <Tooltip className='tooltip' anchorSelect='#mtd-tooltip'>
                  Du stimmst zu {result.mtd}% mit DA überein
                </Tooltip>
              </div>
              <div className='da smaller'>
                <div className='da-wrapper'>
                  <h1>DA</h1>
                  <p className='result-text'>{resultTextDa}</p>
                  <MoreInformationDa />
                </div>
                <a className='percentage end' id='da-tooltip'>
                  {!isNaN(result.da) ? `${result.da}%` : ''}
                </a>
                <Tooltip className='tooltip' anchorSelect='#da-tooltip'>
                  Du stimmst zu {result.da}% mit DA überein{' '}
                </Tooltip>
              </div>
            </>
          ) : result.mtd < result.da ? (
            <>
              <div className='da bigger'>
                <div className='da-wrapper'>
                  <h1>DA</h1>
                  <p className='result-text'>{resultTextDa}</p>
                  <MoreInformationDa />
                </div>
                <a className='percentage start' id='da-tooltip'>
                  {!isNaN(result.da) ? `${result.da}%` : ''}
                </a>
                <Tooltip className='tooltip' anchorSelect='#da-tooltip'>
                  Du stimmst zu {result.da}% mit DA überein
                </Tooltip>
              </div>
              <div className='mtd smaller'>
                <div className='mtd-wrapper'>
                  <h1>MTD</h1>
                  <p className='result-text'>{resultTextMtd}</p>
                  <MoreInformationMtd />
                </div>
                <a className='percentage end' id='mtd-tooltip'>
                  {!isNaN(result.mtd) ? `${result.mtd}%` : ''}
                </a>
                <Tooltip className='tooltip' anchorSelect='#mtd-tooltip'>
                  Du stimmst zu {result.mtd}% mit MTD überein
                </Tooltip>
              </div>
            </>
          ) : (
            <>
              <div className='mtd bigger'>
                <div className='mtd-wrapper'>
                  <h1>MTD</h1>
                  <p className='result-text'>{resultTextMtd}</p>
                  <MoreInformationMtd />
                </div>
                <a className='percentage start' id='mtd-tooltip'>
                  {!isNaN(result.mtd) ? `${result.mtd}%` : ''}
                </a>

                <Tooltip className='tooltip' anchorSelect='#mtd-tooltip'>
                  Du stimmst zu {result.mtd}% mit MTD überein
                </Tooltip>
              </div>
              <div className='da middle'>
                <div className='da-wrapper'>
                  <h1>DA</h1>
                  <p className='result-text'>{resultTextDa}</p>
                  <MoreInformationDa />
                </div>
                <a className='percentage end' id='da-tooltip'>
                  {!isNaN(result.da) ? `${result.da}%` : ''}
                </a>
                <Tooltip className='tooltip' anchorSelect='#da-tooltip'>
                  Du stimmst zu {result.da}% mit DA überein{' '}
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
