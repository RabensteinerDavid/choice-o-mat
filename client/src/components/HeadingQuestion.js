import React from 'react';
import '../style/questions/questionHeading.css';

const HeadingQuestion = ({ questions }) => {
    return (
        <div className='heading-question'>
            {questions.map(question => (
                <div key={question._id}>
                    <h1>{question.heading}</h1>
                    <h2>{question.subheading}</h2>
                </div>
            ))}
        </div>
    );
};

export default HeadingQuestion;
