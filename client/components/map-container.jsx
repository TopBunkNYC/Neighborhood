import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.listingLocation}
  >
    {props.isMarkerShown && <Marker position={props.listingLocation} />}


  </GoogleMap>
))

export default MyMapComponent;
