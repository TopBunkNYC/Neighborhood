import React from 'react';
import DescribeNeighborhood from './desc-neighb.jsx';
import GettingAround from './desc-getting-around.jsx';

class DescriptionSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="descriptions-container">
        <DescribeNeighborhood 
          hostname={this.props.hostname} 
          city={this.props.city} 
          region={this.props.region} 
          country={this.props.country}
          neighbName={this.props.neighbName} 
          neighbDescriptors={this.props.neighbDescriptors} 
          description={this.props.neighbDesc}
        />
        <GettingAround description={this.props.gettingAround}/>
      </div>
    )
  }
}

export default DescriptionSection;
