import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import FotBar from '../../components/FotBar'
import '../../style/questions/horizontalslider.css'
import HeadingQuestion from '../../components/HeadingQuestion'

const HorizontalSlider = ({ question, pageNumber, maxPage }) => {
  const [sliderValues, setSliderValues] = useState(
    question.answers.map(() => 50)
  )

  const { heading, subheading, answers } = question

  const handleSliderChange = (index, event) => {
    const newValues = [...sliderValues];
    newValues[index] = event.target.value;
    setSliderValues(newValues);
  
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach((slider, i) => {
      slider.style.setProperty('--slider-width', `${sliderValues[i]}%`);
    });
  };

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='horitontal-slider-wrapper'>
              {answers.map((answer, index) => (
                <div key={answer._id} className='horitontal-slider-item'>
                  <p className='horitontal-slider-answer'>{answer.text}</p>
                  <div className='horitontal-slider-value'>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={sliderValues[index]}
                      onChange={(e) => handleSliderChange(index, e)}
                      className="slider"
                      
                    />
                    <div className='horitontal-slider-value-textwrapper'>
                      <p className='horitontal-slider-value-text'>nicht gut</p>
                      
                      <p className= 'horitontal-slider-value-text'>sehr gut</p>
                      
                    </div>
                  </div>
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

export default HorizontalSlider
//<p className= 'horitontal-slider-value-text'>{sliderValues[index]}%</p>