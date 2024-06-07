import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/carousel.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import { Player } from '@lottiefiles/react-lottie-player'
import SelectionImage from '../../components/questions_images/SelectionImage'
//swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'
import useWindowDimensions from '../../components/useWindowSize'
import { findPointsToAnswer } from '../../components/LoadQuestion'

const Carousel = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question

  const [focusedButtons, setFocusedButtons] = useState([])

  const { height, width } = useWindowDimensions()

  const toggleFocus = id => {
    if (focusedButtons.includes(id)) {
      setFocusedButtons(prevState =>
        prevState.filter(buttonId => buttonId !== id)
      )
    } else if (focusedButtons.length < 2) {
      setFocusedButtons(prevState => [...prevState, id])
    }
  }

  const getSlidesPerView = () => {
    if (window.innerWidth <= 400) return 1.5
    if (window.innerWidth <= 650) return 2.5
    return 3.5
  }

  const getSpaceBetween = () => {
    if (window.innerWidth <= 650) return 20
    if (window.innerWidth <= 768) return 28
    if (window.innerWidth <= 992) return 34
    if (window.innerWidth <= 1200) return 38
    return 50
  }

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    for (const key in focusedButtons) {
      const value = focusedButtons[key]
      finalAnswersResult['da'] +=
        parseInt(findPointsToAnswer(answers, value).da) / 2
      finalAnswersResult['mtd'] +=
        parseInt(findPointsToAnswer(answers, value).mtd) / 2
    }
    setFinalAnswers(finalAnswersResult)
  }, [focusedButtons])

  return (
    <div className='question-list'>
      <NavBar questionID={question._id} />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <>
              <div className='selection-counter'>{focusedButtons.length}/2</div>
              <Swiper
                watchSlidesProgress={true}
                slidesPerView={getSlidesPerView()}
                spaceBetween={getSpaceBetween()}
                autoplay={{ stopOnLastSlide: false }}
                loop={true}
                navigation={true}
                centeredSlides={true}
                modules={[Navigation]}
                className='mySwiper'
              >
                {answers.map(answer => (
                  <SwiperSlide
                    key={answer._id}
                    className={`swiper-slide ${
                      focusedButtons.includes(answer._id) ? 'focused' : ''
                    }`}
                    onClick={() => {
                      toggleFocus(answer._id)
                    }}
                  >
                    <div className='content-wrapper'>
                      <div className='player-wrapper'>
                        {answer.photo && answer.photo.includes('json') ? (
                          <Player
                            key={answer._id}
                            src={`${process.env.REACT_APP_BASE_URI_LOTTIE}/${answer.photo}`}
                            className='carousel-player'
                            loop
                            autoplay
                          />
                        ) : (
                          answer.photo && (
                            <SelectionImage photo={answer.photo} />
                          )
                        )}
                      </div>
                      <p>{answer.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
    </div>
  )
}

export default Carousel
