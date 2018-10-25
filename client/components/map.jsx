import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="map-section">
        <h4 style={{"color": "gray"}}>MAP GOES HERE</h4>
        <div>Exact location information is provided after a booking is confirmed.</div>
      </div>
    )
  }
}

export default Map;
