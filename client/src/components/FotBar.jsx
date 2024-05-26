import React, { Component } from 'react'
import Arrows from './Arrows'

class FotBar extends Component {
  render () {
    const {
      prevQuestion,
      nextQuestion,
      saveAnswers = saveAnswersHome
    } = this.props
    return (
      <div>
        <Arrows
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
