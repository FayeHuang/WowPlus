import React from 'react'
import PageHead from './PageHead'

export default class MemoryPage extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <PageHead   
          title="Memory Usage"
          dateTime="2016/03/03 10:23"
        />      
      </div>
    )
  }
}