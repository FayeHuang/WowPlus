import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

import GoogleMap from 'google-map-react'
import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button';

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



export default class App extends Component {
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
      center: {lat: 31.34085001, lng: 121.2839},
      zoom: 12
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
          title="DataGo"
          iconElementRight={<RaisedButton label="Draw Map" onTouchTap={this.handleOpen} />}
        />
        <Dialog
          title="Input Data"
          modal={false}
          open={this.state.open}
          contentStyle={customContentStyle}
          onRequestClose={this.handleClose}
          actions={actions}
        >
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
          ref={(refs) => this.myMap = refs}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}>
          {children}
        </GoogleMap>
      </div>
    )
  }
}