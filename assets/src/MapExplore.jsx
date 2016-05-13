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
import {locusData} from '../data/AreaClustering'

import InfoDialog from './InfoDialog'
import RecommendPlace from './RecommendPlace'
import {storeItems, dayItems, timeItems, groupAmount, areaItems} from './constComponent'

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
          radius: Math.sqrt(population) * 80
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
    for ( var area in locusData ) {
      locusData[area].clustering.forEach( (location, index) => {
        if (index < 5) {
          children.push(
            <Place
              lat={location[1]} 
              lng={location[0]}
              text={location[2].toString()}
              key={`${location[1]}-${location[0]}`}
            />
          )
        }
      })
    }
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
          <CardText>
            <Link to="/map/explore" style={{textDecoration: 'none'}}>
              <FlatButton label="客流分析" disabled={true} style={{fontSize:'18px', color:'black', backgroundColor:'#ECD2D2'}} icon={<ActionSupervisorAccount />} />
            </Link>
            <Link to="/map/store" style={{textDecoration: 'none'}}>
              <FlatButton label="選址服務" primary={true} style={{fontSize:'18px'}} icon={<ActionStore />} />
            </Link>
          </CardText>

          <CardText style={{fontSize:'16px'}}>
            <div>
              <span style={{
                paddingRight:'10px', 
                lineHeight:'48px', 
                verticalAlign:'top',
                width: '110px'
              }}>用戶興趣：</span>
              <SelectField
                value={10}
                // onChange={this.handleStoreChange}
                style={{width:'180px'}}
              >
                {storeItems}
              </SelectField>
            </div>
            <div>
              <span style={{
                paddingRight:'10px', 
                lineHeight:'48px', 
                verticalAlign:'top',
              }}>區域：</span>
              <SelectField
                value={5}
                // onChange={this.handleStoreChange}
                style={{width:'180px'}}
              >
                {areaItems}
              </SelectField>
            </div>
            <div>
              <span style={{
                paddingRight:'10px', 
                lineHeight:'48px', verticalAlign:'top'}}>日期：</span>
              <SelectField
                value={3}
                // onChange={this.handleStoreChange}
                style={{width:'180px'}}
              >
                {dayItems}
              </SelectField>
            </div>
            <div>
              <span style={{paddingRight:'10px', lineHeight:'48px', verticalAlign:'top'}}>時段：</span>
              <SelectField
                value={1}
                // onChange={this.handleStoreChange}
                style={{width:'180px'}}
              >
                {timeItems}
              </SelectField>
            </div>
            <div>
              <span style={{paddingRight:'10px', lineHeight:'48px', verticalAlign:'top'}}>分群數：</span>
              <SelectField
                value={1}
                // onChange={this.handleStoreChange}
                style={{width:'180px'}}
              >
                {groupAmount}
              </SelectField>
            </div>
            
            
          </CardText>
          <Divider />
          <CardText style={{fontSize:'16px'}}>

            <h3>圖示說明</h3>
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
        
        <Dialog
          title={`${this.state.infoDialogData.areaDisplayName} 第 ${this.state.infoDialogData.groupId} 群集 屬性分析`}
          modal={false}
          contentStyle={customContentStyle}
          open={this.state.infoDialogOpen}
          onRequestClose={this.handleInfoDialogClose}
          autoScrollBodyContent={true}
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
        </GoogleMap>
      </div>
    )
  }
}
