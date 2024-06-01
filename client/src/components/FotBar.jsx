import React, { Component } from 'react'
import StepProgressBar from './StepProgressBar'

class FotBar extends Component {
  render () {
    const {
      prevQuestion,
      nextQuestion,
      saveAnswers = saveAnswersHome
    } = this.props
    return (
      <div>
        <StepProgressBar
          prevQuestion={prevQuestion}
          saveAnswers={saveAnswers}
          nextQuestion={nextQuestion}
        />
      </div>
    )
  }
}

const saveAnswersHome = () => {
  console.log("no saveAnswers function passed to FotBar component.")
}

export default FotBar
