import React from 'react'
import ReactHowler from 'react-howler'


class Play extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialized: false,
      playing: true
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }

  handlePlay () {
    this.setState({
      playing: true
    })
  }

  handlePause () {
    this.setState({
      playing: false
    })
  }

  render () {
    if (this.state.initialized === true) {
      return (
        <div>
          <ReactHowler
            src={["http://localhost:3000/speak?message=This%20is%20my%20message"]}
            playing={this.state.playing}
          />
          <div onClick={this.handlePlay}>Play</div>
          <div onClick={this.handlePause}>Pause</div>
        </div>
      )
    } else {
      return (
        <div>
          <div
            className='full'
            onClick={e => this.setState({ initialized: true })}
          >
            Initialize Auto Player
          </div>
        </div>
      )
    }
  }
}

export default Play