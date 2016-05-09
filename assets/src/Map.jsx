import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

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


// google-map-react 
import { fitBounds } from 'google-map-react/utils';
import LatLngBounds from 'google-map-react/lib/utils/lib_geo/lat_lng_bounds';
import LatLng from 'google-map-react/lib/utils/lib_geo/lat_lng';

import Place from './Place'
import {getRandomColor} from './lib.js'
import {locusData} from '../data/AreaClustering'

import InfoDialog from './InfoDialog'


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

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

  handleInfoDialogOpen = () => {
    this.setState({infoDialogOpen: true});
  }

  handleInfoDialogClose = () => {
    this.setState({infoDialogOpen: false});
  }

  handleDrawMap = () => {
    const rawData = this.dataInput.getValue()
    let records = rawData.split('\n')
    let objectData = records.map( (record) => {
      let elements = record.split(',')
      let data = {}
      for (let i in elements) {
        if (i == 0) {
          data.date = elements[i]
        }
        else if (i == 1) {
          data.imei = elements[i]
        }
        else {
          var key = Math.floor(i/2).toString()
          i % 2 == 0 ?
            data[key] = { 'lng': elements[i] } :
            data[key]['lat'] = elements[i]
        }
      }
      return data
    })

    let searchBounds = new LatLngBounds();
    objectData.forEach( (record) => {
      let counter = 1
      while (counter <= 24) {
        record[counter]['lat'] != '' && record[counter]['lng'] != '' ?
          searchBounds.extend(new LatLng(record[counter]['lat'], record[counter]['lng']))
          : false
        counter++
      }
    })
    let bounds = {
      nw: {
        lat: searchBounds.getNorthWest().lat,
        lng: searchBounds.getNorthWest().lng
      },
      se: {
        lat: searchBounds.getSouthEast().lat,
        lng: searchBounds.getSouthEast().lng
      }
    };
    let size = {
      width: ReactDOM.findDOMNode(this.myMap).offsetWidth, // Map width in pixels
      height: ReactDOM.findDOMNode(this.myMap).offsetHeight, // Map height in pixels
    };
    let {center, zoom} = ( fitBounds(bounds, size) );
  
    console.log(objectData)
    this.setState({
      open: false, 
      data: objectData,
      center: center,
      zoom: zoom
    })
  }

  handelCircleClick(value) {
    this.setState({ infoDialogOpen:true, infoDialogData:value })
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
          radius: Math.sqrt(population) * 1.1
        });

        google.maps.event.addListener(cityCircle, 'click', 
          this.handelCircleClick.bind( this, {
            center:{lng:lng, lat:lat}, 
            coordinateAmount:population, 
            groupId:count, 
            areaDisplayName: locusData[area].displayName
          })
        );

        count = count + 1
        
      })
    } // end for
  }

  render() {

    let children = []
    return (
      <div style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <AppBar
          title={<Link to="/" style={{textDecoration: 'none', color:'white'}}>DataGo</Link>}
          showMenuIconButton={false}
        />

        <Card 
          style={{ top:'74px', left:10, position: 'absolute', minWidth: 300, opacity: 0.95 }}
        >
          <CardHeader
            title="地區"
          />
          <CardText>
            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#FF4700' }} />
              大宁地区
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#0089FF' }} />
              北外滩区域
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#00FFC4' }} />
              卢湾地区
            </div>

            <div style={{paddingBottom:'10px'}}>
              <div style={{ ...legendStyle, backgroundColor:'#FF9900' }} />
              三林地区
            </div>
            
          </CardText>
        </Card>
        
        <Dialog
          title={`${this.state.infoDialogData.areaDisplayName} 第 ${this.state.infoDialogData.groupId} 群集 屬性分析`}
          modal={false}
          contentStyle={{width:'900px', maxWidth:'none'}}
          open={this.state.infoDialogOpen}
          onRequestClose={this.handleInfoDialogClose}
          autoScrollBodyContent={true}
          autoDetectWindowHeight={true}
        >
          {this.state.infoDialogOpen ? 
            <InfoDialog center={this.state.infoDialogData.center} coordinateAmount={this.state.infoDialogData.coordinateAmount} /> : 
          false }
        </Dialog>

        <GoogleMap
          onGoogleApiLoaded={this.onGoogleApiLoaded.bind(this)}
          yesIWantToUseGoogleMapApiInternals
          ref={(refs) => this.myMap = refs}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {children}
        </GoogleMap>
      </div>
    )
  }
}