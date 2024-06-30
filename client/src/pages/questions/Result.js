import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import { getResultLocalStorage } from '../../components/LoadQuestion'
import '../../style/questions/result.css'
import { Tooltip } from 'react-tooltip'
import { getResults } from '../../api'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function Result () {
  const [result, setResult] = useState(null)
  const [resultTextMtd, setResultTextMtd] = useState('')
  const [resultTextDa, setResultTextDa] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(true)

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
    const timer = setTimeout(() => {
      setModalIsOpen(false)
    }, 4000)

    return () => clearTimeout(timer)
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

  const customStyles = {
    content: {
      width: '100%',
      height: '100%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#5e8035'
    }
  }

  return (
    <div className={`result-body ${isMtdLarger ? 'mtd-first' : 'da-first'}`}>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Result Modal'
        style={customStyles}
      >
        <Player
          src='/lottie/result-fox.json'
          className='result-fox-big'
          loop
          autoplay
          style={{
            height: '800px',
          }}
        />
      </Modal>
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
