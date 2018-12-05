import React from '../../node_modules/react/umd/react.production.min.js';
import DescriptionSections from './DescriptionSection.jsx';
import Landmarks from './Landmarks.jsx'
import axios from 'axios';


export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      listingId: this.props.listingId || null,
      hostFirstName: this.props.hostfirstname || null, 
      hostNeighbDesc: this.props.hostNeighbDesc || null,
      hostGettingAroundDesc: this.props.hostGettingAroundDesc || null,
      listingLocation: this.props.listingLocation || null,
      neighborhoodId: this.props.neighborhoodId || null,
      neighbName: this.props.neighbName || null,
      neighbDescriptors: this.props.neighbDescriptors || null,
      city: this.prop.city || null, 
      region: this.props.region || null,
      country: this.props.country || null,
      nearbyLandmarks: this.props.nearbyLandmarks || []
    }
  }

  componentDidMount() {
    let queryString = window.location.search;
		let listingId = (queryString.slice(4) * 1);
    this.setState({listingId: listingId});

    // Get listing data
    axios.get(`/listingdata`, { params: 
      {id: listingId}
    })

    .then(({data}) => {
      this.setState({
        listingId,
        hostFirstName: data[0].hostfirstname,
        hostNeighbDesc: data[0].neighbdesc,
        hostGettingAroundDesc: data[0].gettingarounddesc,
        listingLat: data[0].listinglat,
        listingLong: data[0].listinglong,
        neighborhoodId: data[0].neighbid
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
        let neighborhood = data[0];
        this.setState({
          neighbName: neighborhood.neighbName,
          neighbDescriptors: [neighborhood.feature1, neighborhood.feature2, neighborhood.feature3, 
            neighborhood.feature4, neighborhood.feature5, neighborhood.feature6, neighborhood.feature7],
          city: neighborhood.cityString,
          region: neighborhood.regionString,
          country: neighborhood.country
        })
      })
    })

    // Get landmark data for five nearest landmarks to this location
    .then(() => {
      axios.get('/landmarkdata', {params: {
        // listingLocation: this.state.listingLocation
        listingLat: this.state.listingLat, 
        listingLong: this.state.listingLong
      }})
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
          <img src="https://kottke.org/plus/misc/images/lotr-google-maps.jpg" alt="example"/>
          <hr/>
        </div>
      )
    }
  }
}
