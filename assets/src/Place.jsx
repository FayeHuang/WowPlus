import React, {PropTypes, Component} from 'react'
import {placeStyle} from './placeStyle.js';

export default class Place extends Component {
  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
       <div style={{...placeStyle, borderColor:this.props.color}}>
          {this.props.text}
       </div>
    );
  }
}