import React from 'react';
import DescriptionSections from './desc-sections.jsx';
import Landmarks from './landmarks.jsx'
import Map from './map.jsx'


export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: true, // this should be set to false in production
      hostFirstName: "Lisa", // this should be blank in production
      hostNeighbDesc: "This is a long description of the neighborhood.", // this should be blank in production
      hostGettingAroundDesc: "This is a description by the host of getting around the neighborhood.", // should be blank in production
      nearbyLandmarks: [],
      listingLocation: {}
    }
  }

  componentDidMount() {
    // do axios requests for data, parsing id from window.Location
    // set this.state.dataLoaded to true
    // load from DB: hostFirstName, neighbDesc, gettingAroundDesc, .......
    // 
  }

  render() {
    if (!this.state.dataLoaded) {
      return (
        <p>Loading...</p>
      )
    } else {
      return(
        <div className="app">
          <h2>The neighborhood</h2>

          <DescriptionSections 
            hostname={this.state.hostFirstName} 
            neighbDesc={this.state.hostNeighbDesc} 
            gettingAround={this.state.hostGettingAroundDesc} 
          />
          
          <hr/>
          <Landmarks/>
          <Map/>
          <hr/>
        </div>
      )
    }
  }
}
