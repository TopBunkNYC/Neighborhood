import React from '../../node_modules/react/umd/react.production.min.js';

const GettingAround = (props) => {
  return (
    <React.Fragment>
      <h3>Getting around</h3>
      <div id="host-description-getting-around">
        {props.description}
      </div>
    </React.Fragment>
  )
}

export default GettingAround;
