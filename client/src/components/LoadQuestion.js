import { useEffect, useState } from 'react'
import { getAllQuestion, getMaxPage } from '../api'

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

export const loadQuestionType = (questions, version) => {
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

export const loadQuestionsOrderID = async () => {
  const [questionsID, setQuestionsID] = useState([])
  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data

    const sortedQuestions = fetchedQuestions.sort((a, b) => a.page - b.page)
    const questionIds = sortedQuestions.map(question => question._id)

    setQuestionsID(questionIds)
    return questionsID
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}
export const loadQuestionsOrderData = async () => {

  try {
    const response = await getAllQuestion()
    const fetchedQuestions = response.data.data
    const sortedQuestions = fetchedQuestions.sort((a, b) => a.page - b.page)
    return sortedQuestions
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}

export const getMaxPageValue = async () => {
  try {
    const data = await getMaxPage();
    console.log(data)
    return data.data.maxPage;
  } catch (error) {
    console.error('Error:', error);
    return null; 
  }
};