import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export const insertQuestion = payload => api.post(`/question`, payload)
export const getAllQuestion = () => api.get(`/questions`)
export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload)
export const deleteQuestionById = id => api.delete(`/question/${id}`)
export const getQuestionById = id => api.get(`/question/${id}`)
export const deleteAllQuestions = () => api.delete(`/question`)
export const getMaxPage = () => api.get(`/question/maxPage`)
export const patchQuestion = (id, payload) => api.patch(`/question-update/${id}`, payload)

const apis = {
  insertQuestion,
  getAllQuestion,
  updateQuestionById,
  getMaxPage,
  deleteQuestionById,
  getQuestionById,
  patchQuestion,
  deleteAllQuestions
}

export default apis