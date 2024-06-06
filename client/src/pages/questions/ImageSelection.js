import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/imageselection.css';
import HeadingQuestion from '../../components/HeadingQuestion';
import { findPointsToAnswer } from '../../components/LoadQuestion';

const ImageSelection = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question;
  const [focusedButtons, setFocusedButtons] = useState([]); 

  const toggleFocus = id => {
    setFocusedButtons(
      prevState =>
        prevState.includes(id)
          ? prevState.filter(buttonId => buttonId !== id) // Entferne den Fokus, wenn der Button bereits fokussiert ist
          : [...prevState, id] // Füge den Fokus hinzu, wenn der Button nicht fokussiert ist
    );
  };

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    }
    console.log(focusedButtons)
    for (const key in focusedButtons) {
      const value = focusedButtons[key]
      finalAnswersResult['da'] += parseInt(
        findPointsToAnswer(answers, value).da
      ) / answers.length
      finalAnswersResult['mtd'] += parseInt(
        findPointsToAnswer(answers, value).mtd
      )/ answers.length
    }
    setFinalAnswers(finalAnswersResult)
  }, [focusedButtons])

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='answer-grid'>
              {answers.map((answer, index) => (
                <div
                  className={`answer-element ${focusedButtons.includes(answer._id) ? 'focused' : ''}`}
                  key={answer._id}
                >
                  <button
                    className={`answer-button ${focusedButtons.includes(answer._id) ? 'focused' : ''}`}
                    onClick={() => toggleFocus(answer._id)}
                  >
                    <img src={`http://localhost:3001/images/${answer.photo}`} alt={answer.text} />
                  </button>
                  {focusedButtons.includes(answer._id) && (
                    <div className='circle'>
                      <div className='checkMark'></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
    </div>
  );
};

export default ImageSelection;
