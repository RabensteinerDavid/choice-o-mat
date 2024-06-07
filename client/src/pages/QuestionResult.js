import React, { useState, useEffect } from 'react'
import '../style/questionupdate.css'
import '../style/questiontypeslist.css'
import '../style/questionresult.css'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'
import { prefilledResults } from './questions/PrefilledResults'
import {
  deleteAllResults,
  deleteResultById,
  getResults,
  insertResults,
  updateResultById
} from '../api'

function QuestionResult () {
  const [result, setResult] = useState('')
  const [resultRangeMin, setResultRangeMin] = useState('')
  const [resultRangeMax, setResultRangeMax] = useState('')
  const [resultText, setResultText] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editValueRangeMin, setEditValueRangeMin] = useState('')
  const [editValueRangeMax, setEditValueRangeMax] = useState('')
  const [editValueText, setEditValueText] = useState('')

  useEffect(() => {
    const fetchDataQuestionTypes = async () => {
      try {
        const response = await getResults();
        const sortedResults = response.data.data.sort((a, b) => {
          const rangeA = parseInt(a.range.split('-')[0]);
          const rangeB = parseInt(b.range.split('-')[0]);
          return rangeB - rangeA;
        });
        setResult(sortedResults);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchDataQuestionTypes();
  }, [result]);

  const addFunction = async () => {
    if (resultRangeMin.length === 0) {
      alert('Please enter a result range min')
      return
    }
    if (resultRangeMax.length === 0) {
      alert('Please enter a result range max')
      return
    }
    if (!resultText) {
      alert('Please enter a result text')
      return
    }

    const newRangeMin = parseInt(resultRangeMin)
    const newRangeMax = parseInt(resultRangeMax)

    if (newRangeMin >= newRangeMax) {
      alert('Invalid range. Max is smaller or equal than min')
      return
    }

    const intersects = result.some(res => {
      const [min, max] = res.range.split('-').map(Number)
      return newRangeMin <= max && newRangeMax >= min
    })

    if (intersects) {
      alert('This range intersects with existing range(s)')
      return
    }

    try {
      const data = {
        range: resultRangeMin + '-' + resultRangeMax,
        text: resultText
      }

      await insertResults(data)
      setResultRangeMin('')
      setResultRangeMax('')
      setResultText('')
    } catch (error) {
      console.error('Error adding question type:', error)
      alert('Failed to add question type. Please check console for details.')
    }
  }

  const handleChangeRangeMin = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    if (count >= 100) {
      setResultRangeMin(100)
    } else {
      setResultRangeMin(count)
    }
  }

  const handleChangeRangeMax = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    if (count >= 100) {
      setResultRangeMax(100)
    } else {
      setResultRangeMax(count)
    }
  }

  const handleEditRangeMin = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    if (count >= 100) {
      setEditValueRangeMin(100)
    } else {
      setEditValueRangeMin(count)
    }
  }

  const handleEditRangeMax = event => {
    let count = parseInt(event.target.value.replace(/[^0-9]/g, ''))
    if (isNaN(count) || count <= 0) {
      count = 0
    }
    if (count >= 100) {
      setEditValueRangeMax(100)
    } else {
      setEditValueRangeMax(count)
    }
  }

  const handleChangeResultText = event => {
    setResultText(event.target.value)
  }

  const deleteFunction = async index => {
    try {
      await deleteResultById(result[index]._id)
    } catch (error) {
      console.error('Error deleting question type:', error)
      alert('Failed to delete question type. Please check console for details.')
    }
  }

  const deletAllResults = async () => {
    setEditIndex(null)
    try {
      await deleteAllResults()
    } catch (error) {
      console.error('Error deleting question type:', error)
      alert('Failed to delete question type. Please check console for details.')
    }
  }
  const prefillResult = async () => {
    try {
      if (result.length > 0) {
        alert('Results already exist')
        return
      }
      for (const result of prefilledResults) {
        await insertResults(result)
      }
    } catch (error) {
      console.error('Error inserting questions:', error)
      alert('Failed to insert questions. Please check console for details.')
    }
  }

  const editFunction = async index => {
    try {
      const updatedResult = {
        range:
          (editValueRangeMin.length === 0
            ? result[index].range.split('-')[0]
            : editValueRangeMin) +
          '-' +
          (editValueRangeMax.length === 0
            ? result[index].range.split('-')[1]
            : editValueRangeMax),
        text: editValueText.length === 0 ? result[index].text : editValueText
      }

      await updateResultById(result[index]._id, updatedResult)
      setEditIndex(null)
    } catch (error) {
      console.error('Error editing question type:', error)
      alert('Failed to edit question type. Please check console for details.')
    }
  }

  return (
    <div className='question-list update'>
      <NavBar />
      <div className='wrapper'>
        <div className='toggle-list space'>
          <a href='/question-type' className='toggle-list'>
            QuestionTypes
          </a>
          <a href='/question' className='toggle-list'>
            Questions
          </a>
        </div>
        <h1 className='title'>Questions Result</h1>
        <table>
          <thead>
            <tr>
              <th>Range</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {result
              ? result.map((res, index) => (
                  <tr key={index}>
                    <td>
                      {editIndex === index ? (
                        <>
                          {console.log(editValueRangeMin)}
                          <div className='inputfield-result'>
                            <p>Min</p>
                            <InputField
                              inputField={'inputField space'}
                              value={editValueRangeMin}
                              placeholder={
                                editValueRangeMin.length === 0
                                  ? result[index].range.split('-')[0]
                                  : editValueRangeMin
                              }
                              onChange={handleEditRangeMin}
                            />
                          </div>
                          <div className='inputfield-result'>
                            <p>Max</p>
                            <InputField
                              inputField={'inputField space'}
                              value={editValueRangeMax}
                              placeholder={
                                editValueRangeMax.length === 0
                                  ? result[index].range.split('-')[1]
                                  : editValueRangeMax
                              }
                              onChange={handleEditRangeMax}
                            />
                          </div>
                        </>
                      ) : (
                        res.range
                      )}
                    </td>

                    <td>
                      {editIndex === index ? (
                        <textarea
                          className='inputField-textarea'
                          value={editValueText}
                          placeholder={
                            editValueText.length === 0
                              ? result[index].text
                              : editValueText
                          }
                          onChange={e => setEditValueText(e.target.value)}
                        />
                      ) : (
                        res.text
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <Link
                          className='update-link questiontype'
                          onClick={() => editFunction(index)}
                        >
                          Save
                        </Link>
                      ) : (
                        <Link
                          className='update-link questiontype'
                          onClick={() => setEditIndex(index)}
                        >
                          Edit
                        </Link>
                      )}
                      <Link
                        className='delete-button questiontype'
                        onClick={() => deleteFunction(index)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <h1 className='title'>Create Question Type</h1>
        <InputField
          label='Result Range Min'
          value={resultRangeMin}
          onChange={handleChangeRangeMin}
        />
        <InputField
          label='Result Range Max'
          value={resultRangeMax}
          onChange={handleChangeRangeMax}
        />
        <label className='label'>
          Result Text
          <textarea
            className='inputField-textarea'
            value={resultText}
            onChange={handleChangeResultText}
          />
        </label>
        <div className='question-buttons'>
          <button className='add-button space' onClick={addFunction}>
            Add New Result
          </button>
          <button className='prefill-button' onClick={prefillResult}>
            Add Prefilled Questions Types
          </button>
          <button
            className='delete-button questiontype space'
            onClick={deletAllResults}
          >
            Delete All Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionResult
