import React from 'react';

const DescribeNeighborhood = (props) => {
  const prefix = 'https://www.airbnb.com/s/';
  let country = props.country.split('');
  for (let i = 0, len = country.length; i < len; i++) {
    if (country[i] === ' ') {
      country[i] = '-'
    }
  }
  country = country.join('');

  return (
    <React.Fragment>
      <div id="airbnb-desc-of-neighb">
        <p><b>Features</b> · {props.neighbDescriptors.join(' · ')}</p>
      </div>
      <p>{props.hostname}'s home is located in <a href={
          prefix + props.city + '--' + country
        }>{props.city},</a> <a href={
          prefix + props.region + '--' + country
        }>{props.region},</a> <a href={
          prefix + country
        }>{props.country}.</a>
      </p>
      <div id="host-desc-of-neighb">
        <p>{props.description}</p>
      </div>
    </React.Fragment>
  )
}

export default DescribeNeighborhood;
