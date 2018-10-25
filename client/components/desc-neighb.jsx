import React from 'react';

const DescribeNeighborhood = (props) => {
  const city = 'https://www.airbnb.com/s/London--United-Kingdom';
  const state = 'https://www.airbnb.com/s/England--United-Kingdom';
  const country = 'https://www.airbnb.com/s/United-Kingdom';

  return (
    <React.Fragment>
      <p>{props.hostname}'s home is located in <a href={city}>London,</a> <a href={state}>England,</a> <a href={country}>United Kingdom.</a></p>
      <div id="host-description-of-neighborhood">
        {props.description}
      </div>
    </React.Fragment>
  )
}

export default DescribeNeighborhood;
