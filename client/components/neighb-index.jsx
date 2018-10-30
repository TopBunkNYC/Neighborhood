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
      neighbName: null,
      neighbDescriptors: null,
      city: null, 
      region: null,
      country: null,
      nearbyLandmarks: []
    }
  }

  componentDidMount() {
    let queryString = window.location.search;
    let listingId = (queryString.slice(-3) * 1)
    this.setState({listingId: listingId})

    // Get listing data
    axios.get('/listingdata', { params: 
      {id: listingId}
    })
    .then(({data}) => {
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
    
    // Get neighborhood data
    .then(() => {
      let neighbId = this.state.neighborhoodId;
      axios.get('/neighborhooddata', {params: {
        id: neighbId
      }})
      .then(({data}) => {
        // console.log('data from neighborhood call:', data);
        this.setState({
          neighbName: data[0].neighbName,
          neighbDescriptors: [data[0].feature1, data[0].feature2, data[0].feature3, 
            data[0].feature4, data[0].feature5, data[0].feature6, data[0].feature7],
          city: data[0].cityString,
          region: data[0].regionString,
          country: data[0].country
        })
      })
    })

    // Get landmark data for five nearest landmarks to this location
    .then(() => {
      axios.get('/landmarkdata', {params: {
        listingLocation: this.state.listingLocation
      }})
      .then(({data}) => {
        // console.log('landmark data sent to client looks like', data);
        this.setState({
          nearbyLandmarks: data,
          dataLoaded: true
        })
      })
    })
    .catch((err) => {console.error(err)})

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
