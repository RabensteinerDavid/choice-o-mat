import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/orderselection.css';
import HeadingQuestion from '../../components/HeadingQuestion';
import { findPointsToAnswer } from '../../components/LoadQuestion';

const OrderSelection = ({ question, setFinalAnswers }) => {
  const { heading, subheading, answers } = question;
  const [order, setOrder] = useState(answers);
  const [pressed, setPressed] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth <= window.innerHeight); // Initial check

  const answersCount = answers.length;
  const factor = answersCount < 6 ? 1.4 : 1;

  const BASE_SIZE = isPortrait ? 45/answersCount : 50/answersCount * factor; // Adjust base size based on orientation
  const MIN_SIZE = isPortrait ? 25/answersCount : 23/answersCount; // Min size in vw or vh (important for CSS file)
  const BASE_FONT_SIZE = isPortrait ? 4/answersCount : 6/answersCount; // Adjust base font size based on orientation
  const FONT_DECREMENT = isPortrait ? 0.07/answersCount : 0.3/answersCount; // Abnahme der Schriftgröße in rem (Important: For CSS file)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsPortrait(window.innerWidth < window.innerHeight); // Update on resize
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOrder = (index, id) => {
    let newPressed = [...pressed];

    if (newPressed.includes(id)) {
      newPressed = newPressed.filter(pressedId => pressedId !== id);
    } else {
      newPressed.push(id);
    }
    setPressed(newPressed);

    const remainingItems = order.filter(item => !newPressed.includes(item._id));

    const newOrder = [
      ...newPressed.map(pressedId =>
        order.find(item => item._id === pressedId)
      ),
      ...remainingItems
    ];
    setOrder(newOrder);
  };

  useEffect(() => {
    let finalAnswersResult = {
      da: 0,
      mtd: 0
    };

    const totalDa = pressed.reduce((total, id) => {
      return total + parseInt(findPointsToAnswer(answers, id).da);
    }, 0);

    const totalMtd = pressed.reduce((total, id) => {
      return total + parseInt(findPointsToAnswer(answers, id).mtd);
    }, 0);

    pressed.forEach(id => {
      const points = findPointsToAnswer(answers, id);
      const percentDa = isNaN(parseInt(points.da) / totalDa)
        ? 0
        : parseInt(points.da) / totalDa;
      const percentMtd = isNaN(parseInt(points.mtd) / totalMtd)
        ? 0
        : parseInt(points.mtd) / totalMtd;
      finalAnswersResult['da'] += percentDa * 100;
      finalAnswersResult['mtd'] += percentMtd * 100;
    });

    setFinalAnswers(finalAnswersResult);
  }, [pressed]);

  const calculateSize = (index, total) => {
    const baseSize = BASE_SIZE; // Basisgröße in vw oder vh
    const minSize = MIN_SIZE; // Mindestgröße in vw oder vh (wichtig für CSS-Datei)
    const decrement = (baseSize - minSize) / total;
    return baseSize - (index * decrement);
  };

  return (
    <div className='question-list'>
      <NavBar questionID={question._id} />
      <div className='main'>
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className='order-selection-wrapper'>
              {order.map((answer, index) => (
                <div
                  onClick={() => handleOrder(index, answer._id)}
                  id={answer._id}
                  key={answer._id}
                  className={`order-selection-item ${
                    pressed.includes(answer._id) ? 'pressed' : ''
                  }`}
                  style={{
                    width: pressed.includes(answer._id)
                      ? `${calculateSize(index, order.length)}${isPortrait ? 'vh' : 'vw'}`
                      : `${BASE_SIZE}${isPortrait ? 'vh' : 'vw'}`,
                    height: pressed.includes(answer._id)
                      ? `${calculateSize(index, order.length)}${isPortrait ? 'vh' : 'vw'}`
                      : `${BASE_SIZE}${isPortrait ? 'vh' : 'vw'}`,
                    fontSize: pressed.includes(answer._id)
                      ? `${BASE_FONT_SIZE - (index * FONT_DECREMENT)}rem`
                      : `${BASE_FONT_SIZE}rem`,
                  }}
                >
                  <p>{answer.text}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question</p>
        )}
      </div>
    </div>
  );
};

export default OrderSelection;
