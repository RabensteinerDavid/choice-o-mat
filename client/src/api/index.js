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
export const deleteAnswerPhoto = (quesitionId, answerId) => api.patch(`/delete-answer-photo/${quesitionId}/${answerId}`)

export const insertQuestionTypes = payload => api.post(`/question-types`, payload)
export const insertQuestionType = (id, payload) => api.post(`/question-types/${id}`, payload)
export const deleteQuestionType = (id) => api.delete(`/question-types/${id}`)
export const deleteAllQuestionTypes = () => api.delete(`/question-types`)
export const patchQuestionTypes = (id, payload) => api.patch(`/question-types/${id}`, payload)
export const getQuestionTypes = () => api.get(`/question-types`)

export const getResults = () => api.get(`/question-result`)
export const insertResults = payload => api.post(`/question-result`, payload)
export const deleteResultByID = (id) => api.delete(`/question-result/${id}`)
export const deleteAllResults = () => api.delete(`/question-result`)
export const updateResultById = (id, payload) => api.put(`/question-result/${id}`, payload)

const apis = {
  insertQuestion,
  getAllQuestion,
  updateQuestionById,
  getMaxPage,
  deleteQuestionById,
  getQuestionById,
  patchQuestion,
  deleteAllQuestions,
  getQuestionTypes,
  insertQuestionTypes,
  deleteAllQuestionTypes,
  patchQuestionTypes,
  deleteQuestionType,
  insertResults,
  getResults,
  deleteResultByID,
  deleteAllResults,
  updateResultById
}

export default apis