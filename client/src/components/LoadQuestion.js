import { useEffect, useState } from 'react'
import { getAllQuestion } from '../api'

export const loadQuestions = selectedType => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllQuestion()
        const fetchedQuestions = response.data.data

        const filteredQuestions = fetchedQuestions.filter(
          question => question.type === selectedType
        )
        setQuestions(filteredQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchData()
  }, [selectedType])

  return questions
}

export const loadQuestionType = (questions,version) => {
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (questions.length > 0) {
        const questionData = questions[version]
        setQuestion(questionData)
      }
    }
    fetchData()
  }, [questions, version])

  return question
}

export const loadQuestionsID = id => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllQuestion()
        const fetchedQuestions = response.data.data

        const filteredQuestions = fetchedQuestions.filter(
          question => question._id === id
        )
        setQuestions(filteredQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    }

    fetchData()
  }, [id])

  return questions
}
