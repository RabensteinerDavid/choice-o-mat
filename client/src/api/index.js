import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const insertQuestion = payload => api.post(`/question`, payload)
export const getAllQuestion = () => api.get(`/questions`)
export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload)
export const deleteQuestionById = id => api.delete(`/question/${id}`)
export const getQuestionById = id => api.get(`/question/${id}`)

const apis = {
    insertQuestion,
    getAllQuestion,
    updateQuestionById,
    deleteQuestionById,
    getQuestionById,
}

export default apis