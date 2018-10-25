import React from 'react';
import DescriptionSections from './desc-sections.jsx';
import Landmarks from './landmarks.jsx'
import Map from './map.jsx'


export default class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: true // this should be set to false in production
    }
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
          <DescriptionSections/>
          <hr/>
          <Landmarks/>
          <Map/>
          <hr/>
        </div>
      )
    }
  }
}