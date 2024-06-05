import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/choicerole.css';
import HeadingQuestion from '../../components/HeadingQuestion';
import { Player } from '@lottiefiles/react-lottie-player';

const icons = {
  0: '/icons/videoschnitt.png',
  1: '/icons/drehbuchautor.png',
  2: '/icons/projektmanager.png',
  3: '/icons/levelplanner.png',
  4: '/icons/audiotechniker.png',
  5: '/icons/spezialeffekte.png',
};

const ChoiceRole = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedJson, setSelectedJson] = useState('');

  const handleClick = (role, jsonFile) => {
    setSelectedRole(role);
    setSelectedJson(jsonFile);
  };

  const half = Math.ceil(answers.length / 2);
  const firstHalf = answers.slice(0, half);
  const secondHalf = answers.slice(half);

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main choicerole'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <br/><br/>
            <div className='content'>
              <div className='left-column'>
                {firstHalf.map((ans, index) => (
                  <button
                    key={index}
                    className={`button ${
                      selectedRole === ans.text ? 'clicked' : ''
                    }`}
                    onClick={() => handleClick(ans.text, ans.photo)}
                  >
                    <img
                      src={icons[index]}
                      alt='Icon'
                      className='button-icon'
                    />
                    {ans.text}
                  </button>
                ))}
              </div>
              <div className='middle-column'>
                {selectedJson ? (
                  <Player
                    src={`http://localhost:3001/lottie/${selectedJson}`}
                    className='player'
                    loop
                    autoplay
                    //style={{ height: '400px', width: '400px' }}
                  />
                ) : (
                  <img
                    src='/PlaceholderImageQ10.png'
                    alt='Platzhalterbild'
                    //style={{ height: '400px', width: '400px' }}
                  />
                )}
              </div>
              <div className='right-column'>
                {secondHalf.map((ans, index) => (
                  <button
                    key={index}
                    className={`button ${
                      selectedRole === ans.text ? 'clicked' : ''
                    }`}
                    onClick={() => handleClick(ans.text, ans.photo)}
                  >
                    <img
                      src={icons[half + index]}
                      alt='Icon'
                      className='button-icon'
                    />
                    {ans.text}
                  </button>
                ))}
              </div>
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
};

export default ChoiceRole;
