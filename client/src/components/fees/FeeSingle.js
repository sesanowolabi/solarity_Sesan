import React, { Component } from 'react';

// apollo

class FeeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidUpdate(nextProps, nextState){

  }

  componentDidMount(){

  }



  render() {
    let data = this.props.data;
    return (
      <div className="fee--item_container full-width clearfix mb_4 ">
        <div className="fee--item pull-left clearfix">
            <h3>{data.feeName}</h3>
            <div dangerouslySetInnerHTML={{__html: data.feeDescription.content}}></div>
        </div>
        <div className="fee--item pull-right clearfix">
            <div dangerouslySetInnerHTML={{__html: data.feeCost.content}}></div>
        </div>
      </div>
    );
  }
}

export default FeeSingle;
