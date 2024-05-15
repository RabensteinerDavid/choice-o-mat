import NavBar from '../components/NavBar'
import QuestionAdd from './QuestionAdd'
import QuestionUpdate from './QuestionUpdate'
import '../style/questionadd.css'

const QuestionSetting = () => {
  return (
    <>
      <NavBar />
      <div className='wrapper'>
        <QuestionUpdate />
        <QuestionAdd />
      </div>
    </>
  )
}

export default QuestionSetting
