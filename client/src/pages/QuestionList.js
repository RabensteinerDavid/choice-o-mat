import React from 'react'
import { useParams } from 'react-router-dom'
import StartSide from './questions/Startside.js'
import ThisOrThat from './questions/ThisOrThat'
import Selection from './questions/Selection'
// import QuestionThree from './questions/QuestionThree'
// import QuestionFour from './questions/QuestionFour'
// import QuestionFive from './questions/QuestionFive'
// import QuestionSix from './questions/QuestionSix'
// import QuestionSeven from './questions/QuestionSeven'
// import QuestionEight from './questions/QuestionEight'
// import QuestionNine from './questions/QuestionNine'
// import QuestionTen from './questions/QuestionTen'
import { loadQuestions, loadQuestionsID } from '../components/LoadQuestion'

const QuestionList = () => {
  const { id: page_id } = useParams()

  const renderList = () => {
    switch (page_id) {
      case '1':
        // const ThisOrThatData = loadQuestionsID('663e84be129278476a92d536')
        const ThisOrThatData = loadQuestions('ThisOrThat')
        return <ThisOrThat questions={ThisOrThatData} version={0} pageNumber={1}/>
      case '2':
        const SelectionData = loadQuestions('Selection')
        return <Selection questions={SelectionData} version={0}  pageNumber={2}/>
      case '3':
        return <ThisOrThat questions={ThisOrThatData} version={0}  pageNumber={3}/>
      //   case '2':
      //     return <QuestionTwo questions={data['VerticalSlider']} />
      //   case '3':
      //     return <QuestionThree questions={data['Carousel']} />
      //   case '4':
      //     return <QuestionFour questions={data['ImageSelection']} />
      //   case '5':
      //     return <QuestionFive questions={data['OrderSelection']} />
      //   case '6':
      //     return <QuestionSix questions={data['DragnDrop']} />
      //   case '7':
      //     return <QuestionSeven questions={data['ThisOrThat']} />
      //   case '8':
      //     return <QuestionEight questions={data['ChoiceRole']} />
      //   case '9':
      //     return <QuestionNine questions={data['SomeOtherType']} />
      //   case '10':
      //     return <QuestionTen questions={data['AnotherType']} />
      default:
        return <StartSide />
    }
  }

  return renderList()
}

export default QuestionList
