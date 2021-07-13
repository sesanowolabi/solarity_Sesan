import React, { Component } from 'react';
import axios from 'axios';


// apollo

import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeEquity: false,
      buy: false,
      refinance: false,
    }
  }  

  componentDidUpdate(prevProps, prevState){
    
  }

  componentDidMount(){
   

  }

  changeEquity(){
    if (this.state.homeEquity) {
      this.setState({
        homeEquity: false
      });
    }
    else{
      this.setState({
        homeEquity: true,
        buy: false,
        refinance: false,
      });
    }
  }

  changeBuy(){
    if (this.state.buy) {
      this.setState({
        buy: false
      });
    }
    else{
      this.setState({
        buy: true,
        homeEquity: false,
        refinance: false,
      });
    }
  }

  changeRefinance(){
    if (this.state.refinance) {
      this.setState({
        refinance: false
      });
    }
    else{
      this.setState({
        buy: false,
        homeEquity: false,
        refinance: true,
      });
    }
  }

  
  
  render() {  
    

    return (
      <div className="container offsetNav">
        <div>
          
          <div className="full-height">
            <h1>Schedule main page</h1>
            <div className="grid">
              <div className="grid1of2">
                <div>
                  <p>What do you want to talk about?</p>

                  <div className="checkbox mb-1" onClick={() => this.changeEquity()}>
                    <input className="checkbox--input" id="equity" type="checkbox" name="equity-check" aria-label="use home equity" role="use home equity" checked={(this.state.homeEquity) ? true : false} onChange={()=> console.log('logging change')} />
                    <div className="checkbox--icon"></div>
                    <div className="checkbox-label">Use Home Equity</div>
                  </div>

                  <div className="checkbox mb-1" onClick={() => this.changeBuy()}>
                    <input className="checkbox--input" id="buy" type="checkbox" name="buy-check" aria-label="buy a home" role="buy a home" checked={(this.state.buy) ? true : false} onChange={()=> console.log('logging change')} />
                    <div className="checkbox--icon"></div>
                    <div className="checkbox-label">Buy a home</div>
                  </div>

                  <div className="checkbox mb-1" onClick={() => this.changeRefinance()}>
                    <input className="checkbox--input" id="refinance" type="checkbox" aria-label="refinance" role="refinance" name="refinance-check" checked={(this.state.refinance) ? true : false} onChange={()=> console.log('logging change')} />
                    <div className="checkbox--icon"></div>
                    <div className="checkbox-label">Refinance</div>
                  </div>


                </div>
              </div>
              <div className="grid1of2">
                <img alt="schedule image" src="/img/schedule-image.jpeg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
