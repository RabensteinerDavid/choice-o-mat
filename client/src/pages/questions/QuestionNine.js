import React from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';

const QuestionNine = ({ questions }) => (
    <div className='question-list'>
        <NavBar />
        <div className="main">
            <h1>Question Nine</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>{question.heading}{question.questiontype} {question.subheading}{question.rating}{question.context}</li>
                ))}
            </ul>
        </div>
        <FotBar prevQuestion={8} nextQuestion={10} />
    </div>
);

export default QuestionNine;
