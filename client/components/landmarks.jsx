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

          <table>
            <tbody>
              <tr>
                <td>Hyde Park</td>
                <td>0.3 mi</td>
              </tr>
              <tr>
                <td>Victoria & Albert Museum</td>
                <td>0.8 mi</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

export default Landmarks;
