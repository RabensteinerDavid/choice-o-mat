import React, { useEffect, useState } from 'react'
import { getQuestionTypes } from '../api'

function DropDownField ({ label, defaultValue, value, onChange }) {
  const [options, setQuestionTypesData] = useState([])

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await getQuestionTypes()
        setQuestionTypesData(response.data.data)
      } catch (error) {
        console.error('Error fetching question types:', error)
      }
    }
    fetchQuestionTypes()
  }, [])

  useEffect(() => {
    if (defaultValue && !value) {
      onChange(defaultValue)
    }
  }, [defaultValue, onChange, value])

  const handleChange = e => {
    const selectedValue = e.target.value
    onChange(selectedValue)
  }

  if (options.length === 0) {
    return (
      <div className='dropdown-field'>
        <p>
          No options available. <a href='/question-type'>Add QuestionTypes</a>
        </p>
      </div>
    )
  }

  return (
    <div className='dropdown-field'>
      <label className='label'>{label}</label>
      <select className='dropdown-select' value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.questiontype}>
            {option.questiontype}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDownField
