import React from '../../node_modules/react/umd/react.production.min.js';
import DescribeNeighborhood from './DescribeNeighborhood.jsx';
import GettingAround from './GettingAround.jsx';

const DescriptionSection = (props) => {
  return (
    <div id="descriptions-container">
      <DescribeNeighborhood 
        hostname={props.hostname} 
        city={props.city} 
        region={props.region} 
        country={props.country}
        neighbName={props.neighbName} 
        neighbDescriptors={props.neighbDescriptors} 
        description={props.neighbDesc}
      />
      <GettingAround description={props.gettingAround}/>
    </div>
  ) 
}

export default DescriptionSection;
