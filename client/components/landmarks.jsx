import React from 'react';

class Landmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="landmarks-section">
        <h3>Nearby landmarks</h3>
        <p>There will be a table of nearby landmarks populated here.</p>
      </div>
    )
  }
}

export default Landmarks;
