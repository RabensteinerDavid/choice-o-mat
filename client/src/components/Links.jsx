import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/links.css'
import Joyride from 'react-joyride'
import { getQuestionById } from '../api'

class Links extends Component {
  constructor (props) {
    super(props)

    this.state = {
      steps: [
        {
          disableBeacon: true,
          target: '.nav-link.questionmark',
          content:
            'Hier können Sie Informationen zu den einzelnen Begriffen nachlesen!',
          spotlightPadding: 20,
          floaterProps: {
            disableAnimation: true
          }
        }
      ],
      isTourCompleted: false,
      questionData: null,
      questionData: []
    }
  }

  componentDidMount () {
    this.checkTourStatus()
  }

  async checkTourStatus () {
    const isTourCompleted = localStorage.getItem('isTourCompleted') === 'true'
    this.setState({ isTourCompleted })
    this.loadQuestionData()
  }

  async loadQuestionData() {
    try {
      getQuestionById(this.props.questionID)
        .then(response => {
          this.setState({ questionData: response.data.data.answers });
        })
        .catch(error => {
          console.error('Error loading question data:', error);
        });
    } catch (error) {
      console.error('Error loading question data:', error);
    }
  }

  handleJoyrideCallback = data => {
    if (data.type === 'tour:end') {
      localStorage.setItem('isTourCompleted', 'true')
      this.setState({ isTourCompleted: true })
    }
  }

  render () {
    const { steps, isTourCompleted } = this.state
    const explanations = this.state.questionData.map((item, index) => (
      <div key={index}>
        <p> {item.text}: {item.explanation}</p>
      </div>
    ));
    
    
    if (isTourCompleted) {
      return (
        <nav>
          <div className='top-header'>
            <div className='cross-wrapper'>
              <Link to='/' className='nav-link cross'></Link>
            </div>
            {explanations}
            <Link  className='nav-link questionmark'>
              ?
            </Link>
          </div>
        </nav>
      )
    }

    return (
      <nav>
        {console.log(this.state.questionData)}
        <Joyride
          steps={steps}
          locale={{
            close: 'Verstanden'
          }}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#5e8035',
              textColor: '#5e8035'
            }
          }}
        />
        <div className='top-header'>
          <div className='cross-wrapper'>
            <Link to='/' className='nav-link cross'></Link>
          </div>
          <Link /*to="/movies/list"*/ className='nav-link questionmark'>?</Link>
        </div>
      </nav>
    )
  }
}

export default Links
