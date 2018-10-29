import React from 'react';
import DescriptionSections from './desc-sections.jsx';
import Landmarks from './landmarks.jsx'
import Map from './map.jsx'
import axios from 'axios';


export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      listingId: null,
      hostFirstName: null, 
      hostNeighbDesc: null,
      hostGettingAroundDesc: null,
      listingLocation: null,
      neighborhoodId: null,
      allLandmarks: [],
      nearbyLandmarks: []
    }
  }

  componentDidMount() {
    let queryString = window.location.search;
    let listingId = (queryString.slice(-3) * 1)
    this.setState({listingId: listingId})

    axios.get(`/listingdata`, { params: 
      {id: listingId}
    })
    .then(({data}) => {
      console.log(data);
      this.setState({
        listingId,
        hostFirstName: data[0].hostFirstName,
        hostNeighbDesc: data[0].neighbDesc,
        hostGettingAroundDesc: data[0].gettingAroundDesc,
        listingLocation: {lat: data[0].listingLat, lng: data[0].listingLong},
        neighborhoodId: data[0].neighbId
      })
    })
    .catch((err) => {console.error(err)})

    this.setState({dataLoaded: true});
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
          <Map listingLocation={this.state.listingLocation}/>
          <hr/>
        </div>
      )
    }
  }
}
