import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/questionOne.css';
import HeadingQuestion from '../../components/HeadingQuestion';

const QuestionEight = ({ questions }) => {
  const [heading, setHeading] = useState([]);
  const [questiontype, setQuestionType] = useState([]);
  const [rating, setRating] = useState([]);
  const [subheading, setSubheading] = useState([]);
  const [context, setContext] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (questions.length > 0) {
        const question = questions[0];
        setContext(question.context);
        setHeading(question.heading);
        setQuestionType(question.questiontype);
        setRating(question.rating);
        setSubheading(question.subheading);
      }
    };
    fetchData();
  }, [questions]);

  return (
    <div className='question-list'>
      <NavBar />
      <div className='main'>
        <HeadingQuestion questions={questions} />
        {questions.length > 0 ? (
          <ul>
            <div className='wrapper'>
              <p>{heading}</p>
              <p>{subheading}</p>
              <p>{context}</p>
              <p>{questiontype}</p>
              <p>{rating}</p>
            </div>
          </ul>
        ) : (
            <p>No questions found at question 8</p>
        )}
      </div>
      <FotBar prevQuestion={7} nextQuestion={9} />
    </div>
  );
};

export default QuestionEight;
