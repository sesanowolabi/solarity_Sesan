import React, { Component } from 'react';
import { Redirect  } from "react-router-dom";

import {Helmet} from "react-helmet";

import BasicBlocks from './components/content-blocks/basic-blocks/BasicBlocks';
import Hero from './components/content-blocks/hero/Hero';
import Cards from './components/content-blocks/elements/Cards';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import FullPageLoader from './components/loaders/FullPageLoader';


//graphql query parts
import basicBlocksQuery from './components/querys/BasicBlocks.js';
import heroQuery from './components/querys/HeroQuery.js';
import metaQuery from './components/querys/MetaQuery.js';

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: '',
        loading: true
      }
      this.cardClicked = this.cardClicked.bind(this);
  };

  cardClicked(d){
    //console.log(d);
    //console.log('lakj;flsdkj;lk')
  }

  // componentDidUpdate(prevProps, prevState) {
  //     // const { pathname } = this.props.slug;
  //     // const { pathname: prevPathname } = prevProps.slug;

  //     // if (this.props.slug && this.props.slug !== prevProps.slug) {
  //       axios.get(`${process.env.REACT_APP_BASE_URL}`+ '/homePage.json').then(res => {
  //         if(res) {
  //          this.setState({
  //             data: res.data.data,
  //             hero: res.data.data[0].hero,
  //             basicBlocks: res.data.data[0].basicBlocks,
  //             loading: false
  //           });
  //          console.log(res.data.data)
  //         }
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     // }
  // }

  componentWillMount(){

  }


  render() {

  const BASIC_PAGE_QUERY = gql`
    {
      entry(section:[homePage]){

        ...on HomePage{
          ${heroQuery.heroQuery}

          ${basicBlocksQuery.basicBlocksQuery}

          ${metaQuery.metaQuery}


          cards{
            ...on CardsCards{
              cardTitle
              icon{
                url
                title
                filename

              }
              linksToOnsite{
                url
                uri
                slug
              }
              linksToOffsite
            }
          }


        }
      }
    }
    `;

    return (
        <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
          {({ loading, error, data }) => {

            if (loading) return <FullPageLoader />;
            if (error) return <Redirect to={'/not-found'} />;

            //console.log(data);

            return (
              <div className="offsetNav">
                <Hero data={data.entry.hero} loading={loading} />

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
                      </Helmet>
                    :
                      <Helmet>
                      <title>{data.entry.metaTitle}</title>
                        <meta name="description" content={data.entry.metaDescription}/>
                        <meta property="og:title" content={data.entry.metaTitle} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={data.entry.url} />
                      </Helmet>

                  }

                <div className="stripe_6 grey1 clearfix cards-con-test">
                  <div className="container full-width row-centered">
                    <div className="card-grid container">
                      {data.entry.cards.map((d, index) => {
                        return (
                          <Cards key={'card' + index} data={d} />
                        );
                        })}
                    </div>

                  </div>
                </div>
                <BasicBlocks data={data.entry.basicBlocks} loading={loading} />
              </div>
            );
          }}
        </Query>
    );
  }
}


export default Home;
