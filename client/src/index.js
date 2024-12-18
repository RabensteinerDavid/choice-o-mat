import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Startside from './pages/questions/Startside'
import QuestionList from './pages/QuestionList'
import QuestionTypesList from './pages/QuestionTypesList'
import QuestionSetting from './pages/QuestionSetting'
import QuestionUpdateFunction from './pages/QuestionUpdateFunction'
import Result from './pages/questions/Result'
import QuestionResult from './pages/QuestionResult'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Startside />} />
      <Route path='/question' element={<QuestionSetting />} />
      <Route path='/result' element={<Result />} />
      <Route path='/questions/:id' element={<QuestionList />} />
      <Route path='/question-update/:id' element={<QuestionUpdateFunction />} />
      <Route path='/question-type/' element={<QuestionTypesList />} />
      <Route path='/question-result/' element={<QuestionResult />} />
    </Routes>
  </BrowserRouter>
)
