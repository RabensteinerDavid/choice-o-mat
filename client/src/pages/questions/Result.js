import { Link } from 'react-router-dom'
import '../../style/questions/result.css'
import { Player } from '@lottiefiles/react-lottie-player'

function Result () {
  function MoreInformation () {
    return (
      <div className='mre-information'>
        <Link to='/questions/1' className='more-information'>
          Jetzt mehr erfahren
        </Link>
      </div>
    )
  }

  return (
    <div className='result-body'>
      <nav>
        <div className='top-header'>
          {/* <div className='cross-wrapper'>
            <Link to='/' className='nav-link cross'></Link>
          </div> */}
        </div>
      </nav>
      <div className='mtd bigger'>
        <div className='mtd-wrapper'>
          <h1>MTD</h1>
          <p className='result-text'>
            Lorem ipsum dolor sit amet consectetur. Massa leo blandit tincidunt
            aenean sit egestas. Est rhoncus sed habitasse sit. Imperdiet
            porttitor tempor imperdiet sit quam tempus ornare. Fermentum nibh a
            quisque ullamcorper amet.
          </p>
          <MoreInformation />
        </div>
        <p className='percentage start'>60%</p>
      </div>
      <div className='da smaller'>
        <div className='da-wrapper'>
          <h1>DA</h1>
          <p className='result-text'>
            Lorem ipsum dolor sit amet consectetur. Massa leo blandit tincidunt
            aenean sit egestas. Est rhoncus sed habitasse sit. Imperdiet
            porttitor tempor imperdiet sit quam tempus ornare. Fermentum nibh a
            quisque ullamcorper amet.
          </p>
          <MoreInformation />
        </div>
        <p className='percentage end'>40%</p>
      </div>
      <Player
        src='/lottie/result-fox.json'
        className='result-fox'
        loop
        autoplay
        style={{
          height: '200px',
          width: '200px'
        }}
      />
    </div>
  )
}

export default Result
