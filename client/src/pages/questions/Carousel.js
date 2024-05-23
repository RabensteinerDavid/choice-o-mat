import React from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/carousel.css'
import HeadingQuestion from '../../components/HeadingQuestion'
import CarouselImage from '../../components/questions_images/CarouselImage'
import { Player } from '@lottiefiles/react-lottie-player';
import SelectionImage from '../../components/questions_images/SelectionImage'

const Carousel = ({ question, pageNumber, maxPage }) => {
  
  const { heading, subheading, answers } = question

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div>
            {answers.map(answer => (
                <div key={answer._id}>
                  <p>{answer.text}</p>
                  <p>Points DA: {answer.points.da}</p>
                  <p>Points MTD: {answer.points.mtd}</p>
                  {answer.photo && answer.photo.includes("json") && (
                    <Player
                      src={`http://localhost:3001/lottie/${answer.photo}`}
                      className='player'
                      loop
                      autoplay
                      style={{ height: '300px', width: '300px' }}
                    />
                  )}
                  {answer.photo && !answer.photo.includes("json") && (
                      <SelectionImage photo={answer.photo} />
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  )
}

export default Carousel
