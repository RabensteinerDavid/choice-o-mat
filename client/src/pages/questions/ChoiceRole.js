import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/choicerole.css';
import HeadingQuestion from '../../components/HeadingQuestion';
import { Player } from '@lottiefiles/react-lottie-player';
import SelectionImage from '../../components/questions_images/SelectionImage';

const ChoiceRole = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
          {/*   <div>
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
            </div> */}
            <div className='Linke Spalte'>
              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
              Videoschnitt
              </button><br/><br/>

              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
                Drehbuch Autor*in
              </button><br/><br/>

              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
                Projekt Manager*in
              </button>
          </div>

          <br/><br/>
          

          <div className='Rechte Spalte'>
              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
                Level Planner*in
              </button>

              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
                Audio Techniker*in
              </button>

              <button 
                className={`button ${clicked ? 'clicked' : ''}`} 
                onClick={handleClick}
              >
                Spezial Effekte
              </button>
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
  );
}

export default ChoiceRole;
