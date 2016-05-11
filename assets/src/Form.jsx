import React, {PropTypes, Component} from 'react'
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router'

import {storeItems, areaItems} from './constComponent'


export default class Form extends Component {

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      storeValue: 1,
      areaValue: 1
    }
  }

  handleStoreChange = (event, index, value) => {
    this.setState({storeValue:value});
  }

  handleAreaChange = (event, index, value) => {
    this.setState({areaValue:value});
  }

  
  render() { 
    return (
      <div className="flex-container" style={{height:'100%'}}>
        Welcome
        <div className="flex-container" style={{width:'300px', padding:'20px 20px 5px 20px', border: '1px solid #9FB79E', backgroundColor:'#F6FFEF'}}>
          <SelectField
            value={this.state.storeValue}
            onChange={this.handleStoreChange}
            floatingLabelText="選擇開店類型"
          >
            {storeItems}
          </SelectField>
          <br />
          <SelectField
            value={this.state.areaValue}
            onChange={this.handleAreaChange}
            floatingLabelText="選擇開店地區"
          >
            {areaItems}
          </SelectField>
          <Link to="/map" style={{textDecoration: 'none', width:'100%'}}>
            <RaisedButton label="推薦開店位置" style={{marginTop:'20px', width:'100%'}} fullWidth={true}  />
          </Link>
        </div>
      </div>
    )
  }
}