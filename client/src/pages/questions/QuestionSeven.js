import React from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';

const QuestionSeven = ({ questions }) => (
    <div className='question-list'>
        <NavBar />
        <div className="main">
            <h1>Question Seven</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>{question.heading}{question.questiontype} {question.subheading}{question.rating}{question.context}</li>
                ))}
            </ul>
        </div>
        <FotBar prevQuestion={6} nextQuestion={8} />
    </div>
);

export default QuestionSeven;
