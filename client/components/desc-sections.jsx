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
        <DescribeNeighborhood hostname={this.props.hostname} description={this.props.neighbDesc}/>
        <GettingAround description={this.props.gettingAround}/>
      </div>
    )
  }
}

export default DescriptionSection;
