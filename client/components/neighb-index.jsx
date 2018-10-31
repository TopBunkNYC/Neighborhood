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
    // console.log('window.location looks like', window.location)
    let listingId = (queryString.slice(-3) * 1)
    this.setState({listingId: listingId})

    // Get listing data
    axios.get(`${window.location.origin}/listingdata?id=${listingId}`)

    // axios.get('http://ec2-3-16-89-66.us-east-2.compute.amazonaws.com/listingdata?id=97')
    .then(({data}) => {
      console.log('the very first data looks like...', data[0])
      this.setState({
        listingId,
        hostFirstName: data[0].hostFirstName,
        hostNeighbDesc: data[0].neighbDesc,
        hostGettingAroundDesc: data[0].gettingAroundDesc,
        listingLat: data[0].listingLat,
        listingLong: data[0].listingLong,
        neighborhoodId: data[0].neighbId
      })
    })
    .catch((err) => {console.error(err)})
    
    // Get neighborhood data
    .then(() => {
      let neighbId = this.state.neighborhoodId;
      axios.get(`${window.location.origin}/neighborhooddata?id=${neighbId}`)
      .then(({data}) => {
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
      axios.get(`${window.location.origin}/landmarkdata?listingLat=${this.state.listingLat}&listingLong=${this.state.listingLong}`)
      .then(({data}) => {
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
            neighbName={this.state.neighbName}              
            neighbDescriptors={this.state.neighbDescriptors}
            city={this.state.city}                          
            region={this.state.region}                      
            country={this.state.country}                      
            neighbDesc={this.state.hostNeighbDesc} 
            gettingAround={this.state.hostGettingAroundDesc} 
          />
          
          <hr/>
          <Landmarks nearbyLandmarks={this.state.nearbyLandmarks}/>
          <Map lat={this.state.listingLat} long={this.state.listingLong}/>
          <hr/>
        </div>
      )
    }
  }
}

/*
      neighbName: null,
      neighbDescriptors: null,
      city: null, 
      region: null,
      country: null,
*/
