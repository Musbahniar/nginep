import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';
import Nginep from './component/nginep';


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
              return <Nginep key={datanginep.id} datanginep={datanginep} />
            })}
          </div>

        </div>
        
        <div className="peta">
          <GoogleMapReact center={center} zoom={15} >
          
          </GoogleMapReact>
        </div>

      </div>

    );
  }
}

export default App;
