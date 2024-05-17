import React, { useEffect, useState } from 'react'
import { getQuestionTypes } from '../api'

function DropDownField ({ label, defaultValue, value, onChange }) {
  const [options, setQuestionTypesData] = useState([])

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const response = await getQuestionTypes()
        response.data.types.forEach(type => {
          setQuestionTypesData(type.questionTypes)
        })
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

  return (
    <div className='dropdown-field'>
      <label className='label'>{label}</label>
      <select
        className='dropdown-select'
        value={value}
        onChange={e => {
          console.log(e.target.value)
          onChange(e.target.value)
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDownField
