import React, {PropTypes, Component} from 'react'
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

import { BarChart } from 'react-d3';
import { data } from '../data/AttrBarChart'
import {dayItems, timeItems} from './constComponent'

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
    // const id = Math.floor(center.lng*100000).toString() + Math.floor(center.lat*100000).toString()
    const id = 1214502312896
    return (
      <div>
        <center>
          日期： 
          <DropDownMenu value={1}>
            {dayItems}
          </DropDownMenu>
          時間：
          <DropDownMenu value={1}>
            {timeItems}
          </DropDownMenu>
          <RaisedButton label="確定" primary={true} />
          <BarChart
            data={data[id]}
            width={800}
            height={350}
            title="興趣屬性長條圖"
            xAxisLabel="種類"
            yAxisLabel="人口數"
          />
        </center>

      </div>
    );
  }
}