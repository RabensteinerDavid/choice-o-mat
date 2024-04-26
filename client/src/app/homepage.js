import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import '../style/homepage.css';
import QuestionList from '../pages/QuestionList';
import QuestionAdd from '../pages/QuestionAdd';

function StartButton() {
  
  const location = useLocation();
  const isQuestion = location.pathname.includes('/questions');
  const editQuestion = location.pathname.includes('/question');

  const show = !isQuestion && !editQuestion;
  return (
    show && (
      <div className="centered-button">
        <nav>
          <Link to="/questions/1" className="start-button">Jetzt Starten</Link>
        </nav>
        <nav>
          <Link to="/question" className="start-button">Add new Question</Link>
        </nav>
      </div>
    )
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <StartButton />
        <Routes>
          <Route path="/question" element={<QuestionAdd />} />
          <Route path="/questions/1" element={<QuestionList id="1"/>} />
          <Route path="/questions/2" element={<QuestionList id="2"/>} />
          <Route path="/questions/3" element={<QuestionList id="3"/>} />
          <Route path="/questions/4" element={<QuestionList id="4"/>} />
          <Route path="/questions/5" element={<QuestionList id="5"/>} />
          <Route path="/questions/6" element={<QuestionList id="6"/>} />
          <Route path="/questions/7" element={<QuestionList id="7"/>} />
          <Route path="/questions/8" element={<QuestionList id="8"/>} />
          <Route path="/questions/9" element={<QuestionList id="9"/>} />
          <Route path="/questions/10" element={<QuestionList id="10"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
