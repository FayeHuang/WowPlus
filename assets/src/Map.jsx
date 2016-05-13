import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import GoogleMap from 'google-map-react'
import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

// google-map-react 
import { fitBounds } from 'google-map-react/utils';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng';

import Place from './Place'
import {getRandomColor} from './lib.js'
import {locusData} from '../data/AreaPopulation'

import InfoDialog from './InfoDialog'
import RecommendPlace from './RecommendPlace'
import {storeItems, dayItems, timeItems} from './constComponent'

/* icon */
import ActionStore from 'material-ui/lib/svg-icons/action/store';
import ActionSupervisorAccount from 'material-ui/lib/svg-icons/action/supervisor-account';


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

const legendStyle = {
  height: '5px', 
  width:'30px', 
  display: 'inline-block', 
  verticalAlign: 'middle', 
  marginRight: '10px',
  opacity: 0.85
}

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      center: {lat: 31.23414, lng: 121.50043},
      zoom: 13,
      infoDialogOpen: false,
      infoDialogData: {}
    }
  }
  
  onGoogleApiLoaded({map, maps}) {
    for (var area in locusData) {
      // Add the circle for this city to the map.
      var color = locusData[area].color
      var count = 1
      locusData[area].clustering.forEach( (location) => {
        var lng = location[0];
        var lat = location[1];
        var population = location[2]

        var cityCircle = new google.maps.Circle({
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map: map,
          center: {lat:lat, lng: lng},
          radius: Math.sqrt(population) * 6
        });
        count = count + 1
      })
    } // end for
  }

  render() {

    return (
      <div style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <AppBar
          title={
              <Link to="/map" style={{textDecoration: 'none', color:'white'}}>DataGo</Link>
          }
          showMenuIconButton={false}
        />

        <Card 
          style={{ top:'74px', left:10, position: 'absolute', minWidth: 300, opacity: 0.95 }}
        >
          <CardText style={{fontSize:'16px'}}>
            <Link to="/map/explore" style={{textDecoration: 'none'}}>
              <FlatButton label="人群探索" primary={true} style={{fontSize:'18px'}} icon={<ActionSupervisorAccount />} />
            </Link>
            <Link to="/map/store" style={{textDecoration: 'none'}}>
              <FlatButton label="開店選址" primary={true} style={{fontSize:'18px'}} icon={<ActionStore />} />
            </Link>
          </CardText>

          <CardText style={{fontSize:'16px'}}>
            <h3 style={{marginTop:0}}>圖示說明</h3>
            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#FF4700' }} />
              大宁地区
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#0089FF' }} />
              北外滩区域
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#38C16F' }} />
              卢湾地区
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#FF9900' }} />
              三林地区
            </div>
          </CardText>
        </Card>
        
        <GoogleMap
          onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        </GoogleMap>
      </div>
    )
  }
}