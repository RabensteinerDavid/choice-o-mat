import React from 'react';
import NavBar from '../../components/NavBar';
import FotBar from '../../components/FotBar';
import '../../style/questions/questionOne.css';

const QuestionOne = ({ questions }) => {
    return (
    <div className='question-list one'>
        <NavBar />
        <div className="main">
            <h1>Question One</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>{question.heading}{question.questiontype} {question.subheading}{question.rating}{question.context}</li>
                ))}
            </ul>
        </div>
        <FotBar prevQuestion={1} nextQuestion={2} />
    </div>
    );
};

export default QuestionOne;
