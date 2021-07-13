import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

// apollo
import ApolloClient, { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
// import StackGrid from "react-stack-grid";
// import VisibilitySensor from "react-visibility-sensor";
import FullPageLoader from "../loaders/FullPageLoader";
import metaQuery from '../querys/MetaQuery.js';



import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../../fragmentTypes.json';

import Cards from './Cards';
import basicBlocksQuery from '../querys/BasicBlocks.js';
import BasicBlocks from './../content-blocks/basic-blocks/BasicBlocks';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      articles:[],
      stories:[],
      loading: true,
      filter: 'hidden',
      cardVisibility: [],
      visibleCount: 10,
    }

    // this.grid = React.createRef();
    // this.openFilter = this.openFilter.bind(this);
    // this.updateLayout = this.updateLayout.bind(this);
    // this.changeVisible = this.changeVisible.bind(this);
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

  componentDidMount(){





    const R = gql`
      {
        entry(section:[resources]){
          ...on Resources{
            ${basicBlocksQuery.basicBlocksQuery}
            selectedArticlesConnection{
              entries{
                ...on Articles{
                  title
                  uri
                  hero{
                  ...on HeroBlogHero {
                    id
                    articleHeading:heading
                    description
                    image{
                      filename
                      title
                      height
                      width
                    }
                  }
                }
                }

              }

            }

            selectedStoriesConnection{
              entries{
                ...on Stories{
                  title
                  uri
                  hero{
                  ...on HeroBlogHero {
                    id
                    storiesHeading:heading
                    description
                    image{
                      filename
                      title
                      height
                      width
                    }
                  }
                }
               }

              }
             }
          }
        }

       categories(group: storiesCategory){
          id
          title
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
        query: R,
      })
      .then(response => {
        //console.log(response.data);

        console.log(response)
        // let featuredEntriesArray = [];
        // let normalEntriesArray = [];
        // let visibilityArray = [];

        // for(let i =0; i < response.data.entries.length; i++){

        //   if (i < 10) {
        //     visibilityArray[i] = 'is-visible-opacity';

        //   }
        //   else{
        //     visibilityArray[i] = 'is-hidden-opacity';
        //   }

        //   //console.log(response.data.entries[i]);
        //   if (response.data.entries[i].isFeatured) {
        //     //console.log('this post needs to be featured');
        //     featuredEntriesArray.push(response.data.entries[i]);
        //   }
        //   else{
        //     //console.log('this post does not need to be featured...');
        //     normalEntriesArray.push(response.data.entries[i]);
        //   }
        // }
          console.log(response.data.entry.selectedArticlesConnection.entries)
          console.log(response.data.entry.selectedStoriesConnection.entries)

          this.setState({
            // entries: normalEntriesArray,
            articles: response.data.entry.selectedArticlesConnection.entries,
            stories: response.data.entry.selectedStoriesConnection.entries,
            basicBlocks: response.data.entry.basicBlocks,
            // categories: response.data.categories,
            loading: false,
            // cardVisibility: visibilityArray,
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
    const BASIC_PAGE_QUERY = gql`
       {
         entry(section: [resources]){
           ...on Resources {
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


        <h1 className="fontSize5 colorBrandSecondary text-center mb-4">Learning Center</h1>


        {(this.state.loading === false && this.state.articles.length !== undefined) ?
          <Cards
            loading={this.state.loading}
            data={this.state.articles}
            heading="Featured Articles"
            linksTo={"/articles"}
            linkText="View More Articles"
          />
        : <FullPageLoader />}



        {(this.state.loading === false && this.state.stories.length !== undefined) ?
          <Cards
            loading={this.state.loading}
            data={this.state.stories}
            heading="Featured Stories"
            linksTo={"/stories"}
            linkText="View More Stories"
          />
        : ''}

        <BasicBlocks data={this.state.basicBlocks} loading={this.state.loading} />
      </div>
    </div>
    );
  }
}

export default Resources;
