import React from 'react';
import { getAllQuestion } from '../api';
import QuestionOne from './questions/QuestionOne';
import QuestionTwo from './questions/QuestionTwo';
import '../style/questionlist.css';
import QuestionThree from './questions/QuestionThree';
import QuestionFour from './questions/QuestionFour';
import QuestionFive from './questions/QuestionFive';
import QuestionSix from './questions/QuestionSix';
import QuestionSeven from './questions/QuestionSeven';
import QuestionEight from './questions/QuestionEight';
import QuestionNine from './questions/QuestionNine';
import QuestionTen from './questions/QuestionTen';

const QuestionList = ({ id }) => {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllQuestion();
                const filteredQuestions = response.data.data.filter(question => question.id.toString() === id.toString());
                setQuestions(filteredQuestions); 
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchData();
    }, [id]); 

    const renderList = () => {
        switch (id.toString()) {
            case '1':
                return <QuestionOne questions={questions}/>;
            case '2':
                return <QuestionTwo questions={questions}/>;
            case '3':
                return <QuestionThree questions={questions}/>;
            case '4':
                return <QuestionFour questions={questions}/>;
            case '5':
                return <QuestionFive questions={questions}/>;
            case '6':
                return <QuestionSix questions={questions}/>;
            case '7':
                return <QuestionSeven questions={questions}/>;           
            case '8':
                return <QuestionEight questions={questions}/>;
            case '9':
                return <QuestionNine questions={questions}/>;
            case '10':
                return <QuestionTen questions={questions}/>; 
            default:
                return null;
        }
    };

    return renderList();
};

export default QuestionList;
