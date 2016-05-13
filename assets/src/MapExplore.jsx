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

const storeIconStyle = { 
  background: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGhlaWdodD0iMTI4cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHdpZHRoPSIxMjhweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9IkxheWVyXzIiLz48ZyBpZD0iTGF5ZXJfMSI+PGc+PHBhdGggZD0iICAgIE02NC4yMzgsNTEuODUxYzAuODM0LDEuODk1LDUuMjg3LDUuNDY2LDkuNjc4LDUuNDY2YzUuMDQ4LDAsOS4wNjYtMy4zNjcsMTAuNTk3LTUuMzYxYzEuNDIxLDIuMTQyLDUuNzEsNS4yNjUsMTEuMDA1LDUuMjY1ICAgIGM1LjI5NCwwLDEwLjY1LTMuMzM0LDEwLjY1LTcuOTU4YzAtMS4xNS0wLjIzNy0xLjk5NC0wLjY1OC0zLjEyMWwtNC4xNDMtMTIuNTMzSDY2LjQ2OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjMxRjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iICAgIE02Ni40NjgsMzMuNjA3aC0yLjY5NkgyNi42MTdsLTQuMTM1LDEyLjUzN2MtMC40MiwxLjEyNy0wLjY1LDEuOTA1LTAuNjUsMy4wNTZjMCw0LjYyNCw1LjM3Miw4LjAwMiwxMC42NjYsOC4wMDIgICAgYzUuMjk1LDAsOS42MTQtMy4wODgsMTEuMDM1LTUuMjI5YzEuNTMxLDEuOTk0LDUuNjEsNS40MDUsMTAuNjU5LDUuNDA1YzQuMzksMCw5LjIxNC0zLjYzNywxMC4wNDYtNS41MzIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9IiAgICBNMTAwLjgzOSw1Ny44Mzd2MzYuMzQ1YzAsMy4xMTItMi44OTcsNS45MTYtNi4wMSw1LjkxNkgzMy43ODZjLTMuMTEyLDAtNi4xOTgtMi44MDQtNi4xOTgtNS45MTZWNTYuNzEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIzMUYyMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9IiAgICBNNzQuOTIsOTcuMjhWNzQuNjY0YzAtMi43MjQsMi4zNDMtNC45OTQsNS4wNjYtNC45OTRoNS43NzdjMi43MjYsMCw0LjkzNCwyLjI3MSw0LjkzNCw0Ljk5NFY5Ny4yOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjMxRjIwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iICAgIE02Mi41MjMsODcuNzAxYzAsMS4yNDQtMS4wMSwyLjI1NC0yLjI1NCwyLjI1NEgzOS45ODRjLTEuMjQ1LDAtMi4yNTQtMS4wMS0yLjI1NC0yLjI1NFY3MS45MjRjMC0xLjI0NSwxLjAwOS0yLjI1NCwyLjI1NC0yLjI1NCAgICBINjAuMjdjMS4yNDQsMCwyLjI1NCwxLjAwOSwyLjI1NCwyLjI1NFY4Ny43MDF6IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMzFGMjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjUiLz48L2c+PC9nPjwvc3ZnPg==")',
  backgroundSize: '35px 35px',
  backgroundRepeat: 'no-repeat',
  width:35,height:35,
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '5px',
};


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
              <FlatButton label="人群探索" disabled={true} style={{fontSize:'18px', color:'black', backgroundColor:'#ECD2D2'}} />
            </Link>
            <Link to="/map/store" style={{textDecoration: 'none'}}>
              <FlatButton label="開店選址" primary={true} style={{fontSize:'18px'}} />
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
                value={1}
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