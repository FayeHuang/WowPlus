import React, {PropTypes, Component} from 'react'
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import { BarChart } from 'react-d3';
import { data } from '../data/AttrBarChart'

export default class InfoDialog extends Component {
  static propTypes = {
    center: PropTypes.object,
    coordinateAmount: PropTypes.number
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {center, coordinateAmount} = this.props
    // console.log(Math.floor(center.lng*100000));
    // console.log(Math.floor(center.lat*100000));
    const id = Math.floor(center.lng*100000).toString() + Math.floor(center.lat*100000).toString()
    console.log(data[id])
    return (
      <div>
        {/*
        <div>
          中心點 : ({Math.floor(center.lng*100000)/100000}, {Math.floor(center.lat*100000)/100000}), 
          總座標數 : {coordinateAmount}
        </div>
        */}
        
        <center>
          時間選擇 : 
          <DropDownMenu value='weekday'>
            <MenuItem value='weekday' primaryText="平日"/>
            <MenuItem value='weekend' primaryText="周末"/>
          </DropDownMenu>
          <DropDownMenu value='morning'>
            <MenuItem value='morning' primaryText="早(6:00-12:00)"/>
            <MenuItem value='afternoon' primaryText="午(12:00-18:00)"/>
            <MenuItem value='night' primaryText="晚(18:00-24:00)"/>
            <MenuItem value='midnight' primaryText="夜(0:00-6:00)"/>
          </DropDownMenu>
          <RaisedButton label="確定" primary={true} />
          <BarChart
            data={data[id]}
            width={800}
            height={350}
            title="Bar Chart"
            xAxisLabel="種類"
            yAxisLabel="人口數"
          />
        </center>

      </div>
    );
  }
}