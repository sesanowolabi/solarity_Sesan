import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// apollo


import StackGrid from "react-stack-grid"; 
import FullPageLoader from "../loaders/FullPageLoader";

// import TimeEstimateBlock from '../helpers/TimeEstimateBlock';

// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import introspectionQueryResultData from '../../fragmentTypes.json'; 


// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData
// });

// const cache = new InMemoryCache({ fragmentMatcher }); 

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      entries:[],
      loading: true,
      filter: 'hidden',
      cardVisibility: [],
      visibleCount: 10,
    }

    this.grid = React.createRef();
    this.updateLayout = this.updateLayout.bind(this);
    this.changeVisible = this.changeVisible.bind(this); 
  }


  updateLayout(){
    //console.log('updating grid?')
    this.grid.updateLayout();
  }

  // componentDidUpdate(nextProps, nextState){
  //   if (nextState.entries.length > 1) {
  //     //console.log('we are updating the state of...');
  //     //console.log(nextState);
  //   }
  // }  



  changeVisible(number, isVisible){


    //console.log(`lets log the visiblity for card number ${number} -> ${isVisible}`);

    if (isVisible && number % 10 === 0) {

      let visible = this.state.visibleCount + 10;
      this.setState({visibleCount: visible});

      let visibleArray = this.state.cardVisibility;
      //visibleArray[number] = 'is-visible';


      for(let i=0; i < visibleArray.length; i++){
        if (i < visible) {
          visibleArray[i] = 'is-visible-opacity';
        }
      }

      this.setState({cardVisibility: visibleArray});

    }


  }



  render() {
    

    return (
      <section className="container"> 
        <h2 className="fontSize3 colorBrandSecondary text-left mb-4">{this.props.heading}</h2>
      {(this.props.loading === false) ?
          
            <StackGrid
              gridRef={grid => this.grid = grid}
              columnWidth={400}
              itemComponent="span"
              gutterWidth={32}
              gutterHeight={32}
              duration={0}
            >





              {this.props.data.map((d, index) => {
 
                let h = parseInt(d.hero[0].image[0].height, 10);
                let w = parseInt(d.hero[0].image[0].width, 10);

                //console.log(`this images width and height is ${w} X ${h}`);

                //if the columnWidth variable in stack grid changes, the 400 in the following line needs to match.
                let newHeight = (h / w) * 400;

                //console.log(`if the new width is 400, the new height should be ${newHeight}`)


                return (
                  <div key={`key${index}`} className={`item item-featured--${index}`} style={{height : 300}}>
                  <Link to={`/${d.uri}`} className="list-post">
                    <div className="thumb-link" href="" title={d.title} rel="bookmark" tabIndex="-1" aria-hidden="true">
                      <div className="cover-image" style={{height:newHeight, backgroundImage: `url('${process.env.REACT_APP_S3_URL}${d.hero[0].image[0].filename}')`}}></div>
                    </div>
                    <div className="card">
                      <div className="h-link" href="" title={d.title} rel="bookmark">
                        <span className="colorBrandSecondary fontSize0 fontBold">FEATURED</span>
                        <h2>{d.title}</h2>
                        <p className="card-copy">{d.hero[0].description}</p>
                      </div>
                      {/* <TimeEstimateBlock data={d.timeEstimate} />*/} 
                  
                    </div>
                  </Link>

                  </div>
                );
              })}


              </StackGrid>            
        : <FullPageLoader />} 

          <div className="text-center block mt-3 mb-8"> 
            <Link className="button button-primary" to={`${this.props.linksTo}`}>{this.props.linkText}</Link>
          </div>
        </section>
    );
  }
}

export default Cards; 
