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
            <br/><br/><br/><br/>
            <div className='content'>
              <div className='left-column'>
                <button
                  className={`button ${selectedRole === 'videoschnitt' ? 'clicked' : ''}`}
                  onClick={() => handleClick('videoschnitt', 'videoschnitt.json')}
                >
                  <img src={icons.videoschnitt} alt='Icon' className='button-icon' />
                  Videoschnitt
                </button><br/><br/>

                <button
                  className={`button ${selectedRole === 'drehbuchautor' ? 'clicked' : ''}`}
                  onClick={() => handleClick('drehbuchautor', 'drehbuchautor.json')}
                >
                  <img src={icons.drehbuchautor} alt='Icon' className='button-icon' />
                  Drehbuch Autor/in
                </button><br/><br/>

                <button
                  className={`button ${selectedRole === 'projektmanager' ? 'clicked' : ''}`}
                  onClick={() => handleClick('projektmanager', 'projektmanager.json')}
                >
                  <img src={icons.projektmanager} alt='Icon' className='button-icon' />
                  Projekt Manager/in
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
                  className={`button ${selectedRole === 'levelplanner' ? 'clicked' : ''}`}
                  onClick={() => handleClick('levelplanner', 'levelplanner.json')}
                >
                  <img src={icons.levelplanner} alt='Icon' className='button-icon' />
                  Level Planner/in
                </button><br/><br/>

                <button
                  className={`button ${selectedRole === 'audiotechniker' ? 'clicked' : ''}`}
                  onClick={() => handleClick('audiotechniker', 'audiotechniker.json')}
                >
                  <img src={icons.audiotechniker} alt='Icon' className='button-icon' />
                  Audio Techniker/in
                </button><br/><br/>

                <button
                  className={`button ${selectedRole === 'spezialeffekte' ? 'clicked' : ''}`}
                  onClick={() => handleClick('spezialeffekte', 'spezialeffekte.json')}
                >
                  <img src={icons.spezialeffekte} alt='Icon' className='button-icon' />
                  Spezial Effekte
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
