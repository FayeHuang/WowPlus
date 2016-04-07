import React, { Component, PropTypes } from 'react'
import LinearProgress from 'material-ui/lib/linear-progress'

export default class UsageBar extends Component {
  
  static propTypes = {
    progress: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <LinearProgress 
        mode='determinate' 
        value={this.props.progress} 
        max={100}
        style={{height:'20px'}}
      />
    )
  }
}