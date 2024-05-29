import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/choicerole.css';
import HeadingQuestion from '../../components/HeadingQuestion';
import { Player } from '@lottiefiles/react-lottie-player';

const icons = {
  videoschnitt: '/icons/videoschnitt.png',
  drehbuchautor: '/icons/drehbuchautor.png',
  projektmanager: '/icons/projektmanager.png',
  levelplanner: '/icons/levelplanner.png',
  audiotechniker: '/icons/audiotechniker.png',
  spezialeffekte: '/icons/spezialeffekte.png',
};

const ChoiceRole = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedJson, setSelectedJson] = useState('');

  const handleClick = (role, jsonFile) => {
    setSelectedRole(role);
    setSelectedJson(jsonFile);
  };

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <br /><br /><br /><br />
            <div className='content'>
              <div className='left-column'>
                <button
                  className={`button ${selectedRole ===  answers[0].text ? 'clicked' : ''}`}
                  onClick={() => handleClick( answers[0].text, ' answers[0].json')}
                >
                  <img src={icons.videoschnitt} alt='Icon' className='button-icon' />
                  {answers[0].text}
                </button><br /><br /><br /><br />

                <button
                  className={`button ${selectedRole ===  answers[1].text ? 'clicked' : ''}`}
                  id="moreLeft"
                  onClick={() => handleClick( answers[1].text, ' answers[1].json')}
                >
                  <img src={icons.drehbuchautor} alt='Icon' className='button-icon' />
                  {answers[1].text}
                </button><br /><br /><br /><br />

                <button
                  className={`button ${selectedRole ===  answers[2].text ? 'clicked' : ''}`}
                  onClick={() => handleClick( answers[2].text, ' answers[2].json')}
                >
                  <img src={icons.projektmanager} alt='Icon' className='button-icon' />
                  {answers[2].text}
                </button>
              </div>

              <div className='middle-column'>
                {selectedJson ? (
                  <Player
                    src={`http://localhost:3001/lottie/${selectedJson}`}
                    className='player'
                    loop
                    autoplay
                    style={{ height: '300px', width: '300px' }}
                  />
                ) : (
                  <img
                    src='/PlaceholderImageQ10.png'
                    alt='Platzhalterbild'
                    style={{ height: '500px', width: '500px' }}
                  />
                )}
              </div>

              <div className='right-column'>
                <button
                  className={`button ${selectedRole ===  answers[3].text ? 'clicked' : ''}`}
                  onClick={() => handleClick(answers[3].text, 'answers[3].json')}
                >
                  <img src={icons.levelplanner} alt='Icon' className='button-icon' />
                  {answers[3].text}
                </button><br /><br /><br /><br />

                <button
                  className={`button ${selectedRole === answers[4].text ? 'clicked' : ''}`}
                  id="moreRight"
                  onClick={() => handleClick(answers[4].text, 'answers[4].json')}
                >
                  <img src={icons.audiotechniker} alt='Icon' className='button-icon' />
                  {answers[4].text}
                </button><br /><br /><br /><br />

                <button
                  className={`button ${selectedRole === answers[5].text ? 'clicked' : ''}`}
                  onClick={() => handleClick(answers[5].text, 'answers[5].json')}
                >
                  <img src={icons.spezialeffekte} alt='Icon' className='button-icon' />
                  {answers[5].text}
                </button>
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
}

export default ChoiceRole;
