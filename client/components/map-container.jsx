import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.listingLocation}
    id="map"
  >
    {props.isMarkerShown && <Marker position={props.listingLocation}/>}

  </GoogleMap>
))

export default MyMapComponent;
