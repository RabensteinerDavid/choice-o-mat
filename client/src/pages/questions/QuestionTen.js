import React from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';

const QuestionTen = ({ questions }) => (
    <div className='question-list'>
        <NavBar />
        <div className="main">
            <h1>Question Ten</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>{question.heading}{question.questiontype} {question.subheading}{question.rating}{question.context}</li>
                ))}
            </ul>
        </div>
        <FotBar prevQuestion={9} nextQuestion={"no-next"} />
    </div>
);

export default QuestionTen;
