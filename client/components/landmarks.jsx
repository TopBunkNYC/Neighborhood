import React from '../../node_modules/react/umd/react.production.min.js';

class Landmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="landmarks-section">
        <h3>Nearby landmarks</h3>
        <div className="landmarks-table" style={{"width": "700px"}}>

          <table>
            <tbody>
              {this.props.nearbyLandmarks.map((landmark) => {
                return (
                  <tr key={landmark.id}>
                    <td>{landmark.landmarkName}</td>
                    <td>{Math.round(landmark.distance * 10) / 10} mi</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

export default Landmarks;
