import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Startside from './pages/questions/Startside'
import QuestionList from './pages/QuestionList'
import QuestionSetting from './pages/QuestionSetting'
import QuestionUpdateFunction from './pages/QuestionUpdateFunction'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Startside />} />
        <Route path='/question' element={<QuestionSetting />} />
        <Route path='/questions/:id' element={<QuestionList />} />
        <Route
          path='/question-update/:id'
          element={<QuestionUpdateFunction />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
