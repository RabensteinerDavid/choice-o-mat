import React, { Component } from 'react'
import Arrows from './Arrows'

class FotBar extends Component {
  render () {
    const { prevQuestion, nextQuestion } = this.props
    return (
      <div>
        <Arrows prevQuestion={prevQuestion} nextQuestion={nextQuestion} />
      </div>
    )
  }
}

export default FotBar
