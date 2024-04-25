import React, { useState } from 'react';
import { insertQuestion } from '../api';
import '../style/questionlist.css';

const QuestionAdd = () => {
    const [id, setID] = useState('');
    const [questionType, setQuestionType] = useState('');
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [rating, setRating] = useState('');
    const [context, setContext] = useState('');


    const handleChangeInputId = (event) => {
        setID(event.target.value);
    };
    const handleChangeInputQuestionType = (event) => {
        setQuestionType(event.target.value);
    };

    const handleChangeInputHeading = (event) => {
        setHeading(event.target.value);
    };

    const handleChangeInputSubHeading = (event) => {
        setSubHeading(event.target.value);
    };

    const handleChangeInputRating = (event) => {
        setRating(event.target.value);
    };

    const handleChangeInputContext = (event) => {
        setContext(event.target.value);
    };

    const handleIncludeQuestion = async () => {
        if (!questionType || !heading || !subHeading || !rating || !context) {
            alert('Please fill in all fields');
            return;
        }

        const idParse = parseInt(id);
        if (isNaN(idParse)) {
            alert('Please enter a valid number for the ID');
            return;
        }
     
        const ratingArray = rating.split(',').map(value => parseFloat(value.trim()));
        if (ratingArray.some(isNaN)) {
            alert('Invalid rating format. Please provide a comma-separated list of numbers.');
            return;
        }
        const contextArray = context.split(',').map(value => value.trim());
        if (contextArray.length === 0) {
            alert('Please provide at least one context.');
            return;
        }

        const payload = { id: idParse, questiontype: questionType, heading, subheading: subHeading, rating: ratingArray, context: contextArray };
        try {
            await insertQuestion(payload);
            alert('Question inserted successfully');
            setID('');
            setQuestionType('');
            setHeading('');
            setSubHeading('');
            setRating('');
            setContext('');
        } catch (error) {
            console.log(payload);
            console.error('Error inserting question:', error);
            alert('Failed to insert question. Please check console for details.');
        }
    };

    return (
        <div className="wrapper">
            <h1>Create Question</h1>

            <label>Id</label>
            <input
                type="text"
                value={id}
                onChange={handleChangeInputId}
            />

            <label>Question Type:</label>
            <input
                type="text"
                value={questionType}
                onChange={handleChangeInputQuestionType}
            />

            <label>Heading:</label>
            <input
                type="text"
                value={heading}
                onChange={handleChangeInputHeading}
            />

            <label>Sub Heading:</label>
            <input
                type="text"
                value={subHeading}
                onChange={handleChangeInputSubHeading}
            />

            <label>Rating:</label>
            <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={rating}
                onChange={handleChangeInputRating}
            />

            <label>Context:</label>
            <input
                type="text"
                value={context}
                onChange={handleChangeInputContext}
            />

            <button onClick={handleIncludeQuestion}>Add Question</button>
        </div>
    );
};

export default QuestionAdd;
