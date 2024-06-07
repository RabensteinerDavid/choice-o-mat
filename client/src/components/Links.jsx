import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../style/links.css'
import Joyride from 'react-joyride'

class Links extends Component {
  state = {
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
    isTourCompleted: false
  }

  componentDidMount () {
    const isTourCompleted = localStorage.getItem('isTourCompleted') === 'true'
    this.setState({ isTourCompleted })
  }

  handleJoyrideCallback = data => {
    console.log(data.type)
    if (data.type === 'tour:end') {
      localStorage.setItem('isTourCompleted', 'true')
      this.setState({ isTourCompleted: true })
    }
  }

  render () {
    const { steps, isTourCompleted } = this.state

    if (isTourCompleted) {
      return (
        <nav>
          <div className='top-header'>
            <div className='cross-wrapper'>
              <Link to='/' className='nav-link cross'></Link>
            </div>
            <Link /*to="/movies/list"*/ className='nav-link questionmark'>
              ?
            </Link>
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
