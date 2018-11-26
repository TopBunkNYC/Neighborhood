import React from '../../node_modules/react/umd/react.production.min.js';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

const MapContainer = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{lat: props.lat, lng: props.long}}
  >
    {props.isMarkerShown && <Marker position={{lat: props.lat, lng: props.long}}/>}

  </GoogleMap>
))

export default MapContainer;
