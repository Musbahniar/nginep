import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import Nginep from './component/nginep';
import Marker from './component/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datanginep: [],
      semuadatanginep: [],
      pilihdatanginep: null,
      search: ''
    };
  }

  componentDidMount () {
    fetch('https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json')
    // fetch('http://localhost/react-js/nginep/src/data.json')
      .then (response => response.json())
      .then ((data) => {
        this.setState ({
          datanginep: data,
          semuadatanginep: data
        });
      });
  }

  handleCari = (event) => {
    this.setState ({
      search: event.target.value,
      datanginep: this.state.semuadatanginep.filter((datanginep) => new RegExp(event.target.value, 'i').exec(datanginep.nama))
    })
  }

  selectedHomestay = (datanginep) => {
    this.setState ({
      pilihdatanginep: datanginep
    })
  }

  render() {
    let center = {
      lat: -7.795424,
      lng: 110.371754
    }

    if (this.state.pilihdatanginep) {
      center = {
        lat: this.state.pilihdatanginep.lat,
        lng: this.state.pilihdatanginep.lng
      }
    }
    
    return (
      <div className="App">
        <div className="main">
          
          <div className="search">
            <input type="text" 
            placeholder="Cari..." 
            value={this.state.search}
            onChange={this.handleCari}/>
          </div>

          <div className="homestay">
            {this.state.datanginep.map((datanginep)=> {
              return <Nginep 
              key={datanginep.id} 
              datanginep={datanginep} 
              selectedHomestay={this.selectedHomestay}/>
            })}
          </div>

        </div>
        
        <div className="peta">
          <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8bw82gKhFMRPLAFidlLTCWd6gCVedhR4' }}
          defaultCenter={center} 
          defaultZoom={15} >
          
          {this.state.datanginep.map((datanginep)=> {
            return <Marker
            key={datanginep.id}
            lat={datanginep.lat}
            lng={datanginep.lng}
            text={datanginep.harga}
            selected={datanginep === this.state.selectedHomestay} />
          })}
          </GoogleMapReact>
        </div>

      </div>

    );
  }
}

export default App;
