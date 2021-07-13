import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

// apollo
import ApolloClient, { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import StackGrid from "react-stack-grid";
import VisibilitySensor from "react-visibility-sensor";
import FullPageLoader from "../loaders/FullPageLoader";
import metaQuery from '../querys/MetaQuery.js';

import TimeEstimateBlock from '../helpers/TimeEstimateBlock';



import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../fragmentTypes.json';


import basicBlocksQuery from '../querys/BasicBlocks.js';
import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';


const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

class Stories extends Component {
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
    this.openFilter = this.openFilter.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.changeVisible = this.changeVisible.bind(this);
  }


  updateLayout(){
    //console.log('updating grid?')
    this.grid.updateLayout();
  }

  componentDidUpdate(nextProps, nextState){
    if (nextState.entries.length > 1) {
      //console.log('we are updating the state of...');
      //console.log(nextState);
    }
  }

  componentDidMount(){




    const CATEGORIES = gql`
      {
        entries(section:[stories]){
          id
          title
          uri
          ...on Stories{
            isFeatured
            hero{
              ...on HeroBlogHero {
                id
                blogHeading:heading
                description
                image{
                  filename
                  title
                  height
                  width
                }
              }
            }

            timeEstimate:basicBlocks{
              type:__typename
              ...on BasicBlocksAccordion{
                id
                item{
                  heading
                  description{
                    content
                  }
                }
              }

              ...on BasicBlocksSingleImage{
                id
              }

              ...on BasicBlocksSingleImageChecklist{
                id

              }

              ...on BasicBlocksTwoImage{
                id
                description1{
                  content
                }
                description2{
                  content
                }
              }

              ...on BasicBlocksProcess{
                id

              }

              ...on BasicBlocksNumberedListWithChecklist{
                id

              }

              ...on BasicBlocksTestimonial{
                id

              }

              ...on BasicBlocksThreeIcon{
                id

              }

              ...on BasicBlocksThreeImage{
                id

              }

              ...on BasicBlocksTwoVideoPlayer{
                id

              }

              ...on BasicBlocksVideoPlayer{
                id

              }

              ...on BasicBlocksTextBlock{
                id
                desc:description{
                  content
                }
              }

              ...on BasicBlocksCta{
                id

              }

              ...on BasicBlocksBigCta{
                id

              }

              ...on BasicBlocksRatesTable{
                id

              }

              ...on BasicBlocksFullWidthImage{
                id

              }

              ...on BasicBlocksForm{
                id

              }
              ...on BasicBlocksCalculator{
                id

              }
            }

          }
        }

        categories(group: storiesCategory){
          id
          title
          uri
        }
      }
    `;

    const client = new ApolloClient({
      uri: `${process.env.REACT_APP_BASE_URL}graph-api`,
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
          },
        });
      },
      cache:cache,
    });

    client
      .query({
        query: CATEGORIES,
      })
      .then(response => {
        //console.log(response.data);

        let featuredEntriesArray = [];
        let normalEntriesArray = [];
        let visibilityArray = [];

        for(let i =0; i < response.data.entries.length; i++){

          if (i < 10) {
            visibilityArray[i] = 'is-visible-opacity';
          }
          else{
            visibilityArray[i] = 'is-hidden-opacity';
          }

          console.log(response.data.entries)
          //console.log(response.data.entries[i]);
          if (response.data.entries[i].isFeatured) {
            //console.log('this post needs to be featured');
            featuredEntriesArray.push(response.data.entries[i]);
            console.log("IS FEATURED")
          }
          else{
            //console.log('this post does not need to be featured...');
            normalEntriesArray.push(response.data.entries[i]);
          }
        }


        this.setState({
          entries: normalEntriesArray,
          featuredEntries: featuredEntriesArray,
          categories: response.data.categories,
          loading: false,
          cardVisibility: visibilityArray,
        });


      });
  }

  openFilter(){
    if(this.state.filter === 'hidden'){
      this.setState({filter: 'visible'})
    } else {
      this.setState({filter: 'hidden'})
    }
  }


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
    let data = this.state.entries;
    let categories = this.state.categories;

    //this sets width of stack grid columns if window is less than 420 pixels wide.
    let sw = (window.innerWidth < 420) ? window.innerWidth - 20 : 400;

    const BASIC_PAGE_QUERY = gql`
       {
         entry(section: [storiesPage]){
           ...on StoriesPage {
             ${metaQuery.metaQuery}
           }
       }
     }`;

    return (
      <div className="offsetNav clearfix">



      <Query query={BASIC_PAGE_QUERY}>
        {({ loading, error, data }) => {

          if (loading) return " ";
          if (error) return '';
          // console.log('logging meta info...');
          // console.log(data);
          // console.log(this.state.hero);
          // console.log(this.state.basicBlocks);

          return (
            <React.Fragment>
            {
              (data.entry.metaImage.length > 0)
              ?
                <Helmet>
                  <title>{data.entry.metaTitle}</title>
                  <meta name="description" content={data.entry.metaDescription}/>
                  <meta property="og:title" content={data.entry.metaTitle} />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={data.entry.url} />
                  <meta property="og:image" content={data.entry.metaImage[0].url} />
                  <link rel="canonical" href={data.entry.url} />
                </Helmet>
              :
                <Helmet>
                  <title>{data.entry.metaTitle}</title>
                  <meta name="description" content={data.entry.metaDescription}/>
                  <meta property="og:title" content={data.entry.metaTitle} />
                  <meta property="og:type" content="website" />
                  <meta property="og:url" content={data.entry.url} />
                  <link rel="canonical" href={data.entry.url} />
                </Helmet>

            }
            </React.Fragment>
          );
        }}
      </Query>



      <div className="stripe_6">


        <h1 className="fontSize5 colorBrandSecondary text-center mb-0">Stories</h1>
        {(this.state.loading === false) ?

          <div className="blog-category-filter container stripe_6 clearfix">

            <div className="filter-toggle pb-4 " onClick={this.openFilter}>
              Show me
                <div className="active-category ml-1">
                  Everything
                  {(this.state.filter === 'visible') ? <span className="feather icon-chevron-up"></span> : <span className="feather icon-chevron-down"></span>}
                </div>
            </div>
            <div className={"categories grid7of12 noGutter " + this.state.filter}>
                <div className="grid1of4 pb-3">
                    <Link to="/stories" className="link-hover" onClick={this.openFilter}>Everything</Link>
                </div>
              {categories.map((c, index) => {
                return (
                  <div key={'cat-map' + index} className="grid1of4 pb-3">
                    <Link to={`/${c.uri}`} key={index} className="link-hover" onClick={this.openFilter}>{c.title}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        : '' }


        {(this.state.loading === false) ?
          <section>

            <StackGrid
              gridRef={grid => this.grid = grid}
              columnWidth={sw}
              itemComponent="span"
              gutterWidth={32}
              gutterHeight={32}
              duration={0}
            >





              {this.state.featuredEntries.map((d, index) => {

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
                      <TimeEstimateBlock data={d.timeEstimate} />
                    {/*
                      <div className="meta">
                        {d.blogCategories.map((b, i) => {
                          return (
                            <div to={`/${b.uri}`} className="colorGrey4" key={i}>
                              {b.title}<span className="pr-1">{(i != d.blogCategories.length - 1) ? ',  ' : ''}</span>
                            </div>
                          );
                        })}
                      </div>
                    */}
                    </div>
                  </Link>

                  </div>
                );
              })}



              {data.map((d, index) => {

                let h = parseInt(d.hero[0].image[0].height, 10);
                let w = parseInt(d.hero[0].image[0].width, 10);

                //console.log(`this images width and height is ${w} X ${h}`);

                //if the columnWidth variable in stack grid changes, the 400 in the following line needs to match.
                let newHeight = (h / w) * 400;

                //console.log(`if the new width is 400, the new height should be ${newHeight}`)


                return (
                  <VisibilitySensor key={`key${index}`} onChange={(isVisible) => this.changeVisible(index, isVisible)}>

                  <div  className={`item item--${index} blog-item ${this.state.cardVisibility[index]}`} style={{height : 300}}>

                  <Link to={`/${d.uri}`} className="list-post">
                    <div className="thumb-link" href="" title={d.title} rel="bookmark" tabIndex="-1" aria-hidden="true">
                      <div className="cover-image" style={{height:newHeight, backgroundImage: `url('${process.env.REACT_APP_S3_URL}${d.hero[0].image[0].filename}')`}}></div>
                    </div>

                    <div className="card">

                        <div className="h-link" href="" title={d.title} rel="bookmark">
                          <h2>{d.title}</h2>
                          <p className="card-copy">{d.hero[0].description}</p>
                        </div>
                        <TimeEstimateBlock data={d.timeEstimate} />

                  {/*
                      <div className="meta">
                        {d.blogCategories.map((b, i) => {
                          return (
                            <div to={`/${b.uri}`} className="colorGrey4" key={i}>
                              {b.title}<span className="pr-1">{(i != d.blogCategories.length - 1) ? ',  ' : ''}</span>
                            </div>
                          );
                        })}
                      </div>

                  */}
                    </div>
                  </Link>
                  </div>
                  </VisibilitySensor>
                );
              })}
              </StackGrid>

            </section>

        : <FullPageLoader />}
      </div>
    </div>
    );
  }
}

export default Stories;
