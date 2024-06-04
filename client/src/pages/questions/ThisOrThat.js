import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/thisorthat.css';
import HeadingQuestion from '../../components/HeadingQuestion';

const ThisOrThat = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerClick = (id, answer) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [id]: answer
    }));
  };

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <>
            <HeadingQuestion heading={heading} subheading={subheading} />
            
            <div className='answers-container3'><div class='yesno'>
              <p> Ja | Nein</p>
            </div>
              {answers.map((answer, index) => (
                <div key={answer._id} className='answer-wrapper3'>
                  <p className='answer-text3'>{answer.text}</p>
                  
                  <div className='buttons3'>
                    <div className='button-group'>
                      <button
                        className={`answer-button3 left ${selectedAnswers[answer._id] === 'ja' ? 'selected' : ''}`}
                        onClick={() => handleAnswerClick(answer._id, 'ja')}
                      ></button>
                      <div className='divider'></div>
                      <button
                        className={`answer-button3 right ${selectedAnswers[answer._id] === 'nein' ? 'selected' : ''}`}
                        onClick={() => handleAnswerClick(answer._id, 'nein')}
                      ></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  );
}

export default ThisOrThat;
