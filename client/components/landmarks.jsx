import React from 'react';

class Landmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="landmarks-section">
        <h3>Nearby landmarks</h3>
        <div className="landmarks-table" style={{"width": "700px"}}>

          <div className="landmarks-names" style={{"width": "500px", "float": "left"}}>
          Hyde Park
          </div>

          <div className="landmarks-distances" style={{"width": "70px", "margin-left": "500px"}}>
          0.3 mi
          </div>

          <div className="landmarks-names" style={{"width": "500px", "float": "left"}}>
          Victoria & Albert Museum
          </div>

          <div className="landmarks-distances" style={{"width": "70px", "margin-left": "500px"}}>
          0.8 mi
          </div>

        </div>
      </div>
    )
  }
}

export default Landmarks;
