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
  static defaultProps = {
    center: {lat: 31.34085001, lng: 121.2839},
    zoom: 12,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      data: [],
      center: {lat: 31.23414, lng: 121.50043},
      zoom: 13
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Draw Map"
        primary={true}
        onTouchTap={this.handleDrawMap}
      />,
    ];

    let children = []
    this.state.data.forEach( (record) => {
      let color = getRandomColor()
      let counter = 1
      while (counter <= 24) {
        record[counter]['lat'] != '' ?
          children.push(
            <Place
              lat={record[counter]['lat']} 
              lng={record[counter]['lng']}
              text={counter.toString()}
              key={`${record.imei}-${record.date}-${counter}`}
              color={color}
            />
          ) : false
        counter++
      }
    })

    
    return (
      <div style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <AppBar
          title={<Link to="/" style={{textDecoration: 'none', color:'white'}}>DataGo</Link>}
          iconElementRight={<RaisedButton label="Draw Map" onTouchTap={this.handleOpen} />}
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
          title="Input Data"
          modal={false}
          open={this.state.open}
          contentStyle={customContentStyle}
          onRequestClose={this.handleClose}
          actions={actions}
          style={{overflow: 'scroll'}}
        >
          <ListItem
            primaryText={
              <div>
                <span>/user/hive/warehouse/syslog.db</span>
                <span style={{float:'right'}}>30TB</span>
              </div>
            }
          />
          <TextField
            floatingLabelText="Enter input data "
            multiLine={true}
            rows={10}
            fullWidth={true}
            underlineShow={false}
            ref={(ref) => this.dataInput = ref}
          />
        </Dialog>
        <GoogleMap
          onGoogleApiLoaded={({map, maps}) =>
            { 
              console.log(map, maps)
              var daningArea = new google.maps.Rectangle({
                strokeColor: '#FF4700',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF4700',
                fillOpacity: 0.35,
                map: map,
                bounds: {
                  north: 31.30025,
                  south: 31.2354,
                  east: 121.48956,
                  west: 121.44149
                }
              });
              var northBundArea = new google.maps.Rectangle({
                strokeColor: '#0089FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0089FF',
                fillOpacity: 0.35,
                map: map,
                bounds: {
                  north: 31.28999,
                  south: 31.23981,
                  east: 121.55445,
                  west: 121.49814
                }
              });
              var luwanArea = new google.maps.Rectangle({
                strokeColor: '#00FFC4',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#00FFC4',
                fillOpacity: 0.35,
                map: map,
                bounds: {
                  north: 31.23482,
                  south: 31.18446,
                  east: 121.49934,
                  west: 121.4245
                }
              });
              var sanlinArea = new google.maps.Rectangle({
                strokeColor: '#FF9900',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF9900',
                fillOpacity: 0.35,
                map: map,
                bounds: {
                  north: 31.23658,
                  south: 31.19018,
                  east: 121.55977,
                  west: 121.50621
                }
              });
            }
          }
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