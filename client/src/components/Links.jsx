import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/links.css'
import Joyride from 'react-joyride'
import { getQuestionById } from '../api'
import Modal from 'react-modal'

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
      questionData: [],
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount () {
    Modal.setAppElement('#root')
    this.checkTourStatus()
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  checkTourStatus () {
    const isTourCompleted = localStorage.getItem('isTourCompleted') === 'true'
    this.setState({ isTourCompleted })
    this.loadQuestionData()
  }

  async loadQuestionData () {
    try {
      getQuestionById(this.props.questionID)
        .then(response => {
          this.setState({ questionData: response.data.data.answers })
        })
        .catch(error => {
          console.error('Error loading question data:', error)
        })
    } catch (error) {
      console.error('Error loading question data:', error)
    }
  }

  handleJoyrideCallback = data => {
    if (data.type === 'tour:end') {
      localStorage.setItem('isTourCompleted', 'true')
      this.setState({ isTourCompleted: true })
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  handleKeyPress (event) {
    if (event.key === 'Escape') {
      this.closeModal()
    }
  }

  render () {
    const { steps, isTourCompleted, questionData, modalIsOpen } = this.state
    const hasExplanations = questionData.some(item => item.explanation)
    const explanations = hasExplanations ? (
      questionData.map(
        (item, index) =>
          item.explanation && (
            <div key={index} className='explanation-text-modal'>
              <p className='explanation-text-modal'>
                {item.text}: {item.explanation}
              </p>
            </div>
          )
      )
    ) : (
      <div>
        <p>Keine Erklärungen</p>
      </div>
    )
    if (isTourCompleted) {
      return (
        <nav>
          <div className='top-header'>
            <div className='cross-wrapper'>
              <Link to='/' className='nav-link cross'></Link>
            </div>
            <Link className='nav-link questionmark' onClick={this.openModal}>
              ?
            </Link>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel='Example Modal'
            >
              <div className='modal-explanations'>
                <div className='modal-explanations-button'>
                  <div className='cross-wrapper-modal'>
                    <Link
                      onClick={this.closeModal}
                      className='nav-link cross'
                    ></Link>
                  </div>
                </div>

                <h1>Erklärungen</h1>
                {explanations}
              </div>
            </Modal>
          </div>
        </nav>
      )
    }
    return (
      <nav>
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
            },
            spotlight: {
              width: 10,
              height: 50,
              borderRadius: '100%'
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