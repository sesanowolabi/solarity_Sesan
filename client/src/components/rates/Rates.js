import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import Hashids from 'hashids';

import { StickyContainer, Sticky } from 'react-sticky';

import RateItem from './RateItem'

class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      loading: true,
      keys: []
    }

  }


  componentDidMount(){
    // axios.get(`${process.env.REACT_APP_BASE_URL}/rates.json`).then(res => {
    //   if(res) {
    //     this.setState({
    //       data: res.data.data,
    //       loading: false
    //     });
    //    ////console.log(res.data.data)
    //   }
    // })
    // .catch(error => {
    //   //console.log(error);
    // });
    var rates = this.props.data.entries[0].pagesConnection.entries;
    ////console.log(rates);

    var hashids = new Hashids('', 10);
    var i;
    var temp = this.state.keys;
    for (i = 0; i < rates.length ; i++) {
      temp.push({'id':hashids.encode(i)})
    }


    this.setState({
      data: this.props.data.entries[0].pagesConnection.entries,
      loading: false,
      keys: temp,
    })
  }


  render() {

    var rates = this.props.data.entries[0].pagesConnection.entries;
    var dateUpdated = this.props.data.entries[0].ratesPageUpdated;
    console.log(this.props.data);



    return (
      <div className="stripe-lrg main-content grid clearfix offsetNav">
        <h1 className="fontBold fontSize5 text-center">Rates</h1>
        <StickyContainer>
        <div className="flex">


          <div className="grid1of4 block force-hide-mobile ">


            <Sticky >

              {({
                style,

                // the following are also available but unused in this example
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => (
                <div style={style}  className="rates-scrollable">
                  <h3>Jump to Category</h3>
                  {(this.state.loading === false) ?
                    <div>
                      {rates.map((d, i) => {
                        return (
                          <div key={i}>
                            <a className="link fontSize1" onClick={() => scrollToComponent((this.state.keys[i].id), { offset: -150, align: 'top', duration: 400})}>{d.title}</a>
                          </div>
                        );
                      })}
                    </div>
                  : ''}
                </div>
              )}
            </Sticky>

          </div>

          {(this.state.loading === false) ?
            <div className="grid3of4">
              {rates.map((data, index) => {
                return (
                  <section key={index} ref={(section) => {((this.state.keys[index].id) = section )}}>

                    <RateItem index={index} data={data} />
                  </section>
                );
              })}
            </div>
          : 'loading!'}

        </div>
        </StickyContainer>

        <div className="text-center mt-4 mb-4">
          Rates Effective {dateUpdated}
        </div>
      </div>
    );
  }
}

export default Rates;
