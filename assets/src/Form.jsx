import React, {PropTypes, Component} from 'react'
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router'

const storeItems = [
  <MenuItem key={1} value={1} primaryText="購物" />,
  <MenuItem key={2} value={2} primaryText="IT" />,
  <MenuItem key={3} value={3} primaryText="餐飲" />,
  <MenuItem key={4} value={4} primaryText="房產" />,
  <MenuItem key={5} value={5} primaryText="健康" />,
  <MenuItem key={6} value={6} primaryText="金融" />,
  <MenuItem key={7} value={7} primaryText="旅遊" />,
  <MenuItem key={8} value={8} primaryText="體育" />,
  <MenuItem key={9} value={9} primaryText="汽車" />,
  <MenuItem key={10} value={10} primaryText="時事" />,
  <MenuItem key={11} value={11} primaryText="社會" />,
  <MenuItem key={12} value={12} primaryText="文娛" />,
  <MenuItem key={13} value={13} primaryText="招聘" />,
  <MenuItem key={14} value={14} primaryText="教育" />,
  <MenuItem key={15} value={15} primaryText="網遊" />,
];

const areaItems = [
  <MenuItem key={1} value={1} primaryText="大宁地区" />,
  <MenuItem key={2} value={2} primaryText="北外滩区域" />,
  <MenuItem key={3} value={3} primaryText="卢湾地区" />,
  <MenuItem key={4} value={4} primaryText="三林地区" />,
];


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