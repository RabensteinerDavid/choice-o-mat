import React, { useState, useEffect } from 'react'
import '../style/questionupdate.css'
import '../style/questiontypeslist.css'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'

function QuestionResult () {
  return (
    <div className='question-list update'>
      <NavBar />
      <div className='wrapper'>
        <div className='toggle-list space'>
          <a href='/question-type' className='toggle-list'>
            Change Questiontype
          </a>
          <a href='/question' className='toggle-list'>
            Change Question
          </a>
        </div>
        <h1 className='title'>Questions Result</h1>
        <table>
          <thead>
            <tr>
              <th>Range</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <h1 className='title'>Create Question Type</h1>
        <InputField
          label='New Question Type'
          //   value={questionTypeInput}
          //   onChange={handleChangeHeadingType}
        />
        <div className='question-buttons'>
          <button className='add-button space'>Add Questions Types</button>
          <button className='prefill-button'>
            Add Prefilled Questions Types
          </button>
          <button className='delete-button questiontype space'>
            Delete All Questions
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionResult
