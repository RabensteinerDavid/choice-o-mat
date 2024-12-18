import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI
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
export const insertQuestionType = (payload) => api.post(`/question-types/`, payload)
export const deleteQuestionTypeById = (id) => api.delete(`/question-types/${id}`)
export const deleteAllQuestionTypes = () => api.delete(`/question-types`)
export const updateQuestionTypeById = (id, payload) => api.put(`/question-types/${id}`, payload)
export const getQuestionTypes = () => api.get(`/question-types`)

export const getResults = () => api.get(`/question-result`)
export const insertResults = payload => api.post(`/question-result`, payload)
export const deleteResultById = (id) => api.delete(`/question-result/${id}`)
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
  updateQuestionTypeById,
  deleteQuestionTypeById,
  insertResults,
  getResults,
  deleteResultById,
  deleteAllResults,
  updateResultById
}

export default apis