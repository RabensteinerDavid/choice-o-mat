import { useState } from 'react'
import NavBar from '../components/NavBar'
import QuestionAdd from './QuestionAdd'
import QuestionUpdate from './QuestionUpdate'
import '../style/questionadd.css'

const QuestionSetting = () => {
  const [showQuestionAdd, setShowQuestionAdd] = useState(true)

  const handleToggleQuestionAdd = () => {
    setShowQuestionAdd(!showQuestionAdd)
  }

  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <QuestionUpdate onToggleQuestionAdd={handleToggleQuestionAdd} />
        {showQuestionAdd && <QuestionAdd />}
      </div>
    </>
  )
}

export default QuestionSetting
