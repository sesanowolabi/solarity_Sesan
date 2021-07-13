import React, { Component } from 'react';

import {Helmet} from "react-helmet";

import FullPageLoader from '../loaders/FullPageLoader';

//instant search
import FaqSearch from '../FaqSearch';

import RelatedArticles from './RelatedArticles';
import AccordionItem from './AccordionItem';

// apollo
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import metaQuery from '../querys/MetaQuery.js';

class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      categories:[],
      categorySelected: false,
      loading: true,
    }
  }

  changedCategory(){
    let val = this.categoryFilter;
    if(val.options[val.selectedIndex].value !== 'none'){
      // let data = val.options[val.selectedIndex].value;
      let data = val.options[val.selectedIndex].id;
      this.setState({
        categoryFilter: data,
        categorySelected: true
      });
      console.log('hit');
      console.log(val)
      console.log(data)
    } else {
      this.setState({
        categorySelected: false
      });
    }
  }

  render() {


    let CATEGORIES = gql`
      {
        categories(groupId:2){
          id
          title
          slug
          uri
          ...on FaqCategoryCategory {
            image {
              filename
              id
              id
              url
            }
          }
        }
      }
    `;

    const RELATED_ARTICLES = gql`
        {
          entry(section:faqsPage){
            ...on FaqsPage{
              id
              title
              ${metaQuery.metaQuery}
                relatedContentConnection{
                  entries{
                    title
                    ... on Faqs {
                      heading
                      image {
                        filename
                      }
                      uri
                    }
                  }
              }

            }
          }
        }
    `;

    const RELATED_QUESTIONS = gql`
          {
            entries(section:[faqs], relatedTo:[{element:${this.state.categoryFilter}}]){
              ...on Faqs{
                id
                title
                heading
                description{
                  content
                }
              }
            }
          }
        `;

    return (
      <div className="offsetNav">
        <Helmet><title>FAQs & Help</title></Helmet>
        <div className="container content faqs">
          <div className="faq-upper-section clearfix">
            <h1 className="fontBold fontSize4 mb-4">What can we help you with?</h1>
            <div className="container--sm">
              <div className="grid5of12">
                <Query query={CATEGORIES}>
                  {({ loading, error, data }) => {
                    if (loading) return '';
                    if (error) return '';

                    return (

                      (data.categories) ?
                        <select className="departments-filter select full-width selectLh " ref={(categoryFilter) => { this.categoryFilter = categoryFilter; }} onChange={() => this.changedCategory()}>
                        <option value="none">Browse all categories</option>

                        {data.categories.map((d, index) => {
                          return(
                            <option value={d.title} key={'cat'+index} id={d.id}>{d.title}</option>
                          );
                        })}
                        </select>

                      : ""
                    );
                  }}
                </Query>
              </div>
              <div className="grid7of12">
                <FaqSearch/>
              </div>
            </div>
            {/*
            <p>Or, <a href="/contact">contact our amazing member support team.</a></p>
            */}
          </div>
        </div>

        {/*
          <div className="faq-categories-holder">

            <Query query={CATEGORIES}>
            {({ loading, error, data }) => {
              //console.log(data);
              if (loading) return '';
              if (error) return `Error!: ${error}`;

              return (
                (data.categories) ?
                data.categories.map((d, index) => {

                  return (
                    <FaqCategoryItem key={index} catUri={data.categories[index].uri} catId={data.categories[index].id} title={data.categories[index].title} image={data.categories[index].image[0].filename}/>
                  );
                })
                : ""
              );
            }}
          </Query>

            {data.map((d, index) => {
              return (
                <FaqCategoryItem key={index} catUri={data[index].uri} catId={data[index].id} title={data[index].title}/>
              );
            })}
          </div>
        */}



        <div className="container--sm">
          {(this.state.categorySelected === true)
            ? <Query query={RELATED_QUESTIONS}>
              {({ loading, error, data }) => {
                if (loading) return <FullPageLoader />;
                if (error) return '';

                return (
                   <div>

                      {data.entries.map((d, index) => {
                        return (
                          <div key={'faq'+index}>
                            {console.log(d)}
                            <AccordionItem data={d} key={index} index={index} />
                          </div>
                        );
                      })}
                   </div>
                );
              }}
            </Query>
          :''}
        </div>








        <Query query={RELATED_ARTICLES}>
          {({ loading, error, data }) => {
            if (loading) return <FullPageLoader />;
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
                <RelatedArticles
                  data={data.entry.relatedContentConnection.entries}
                  loading={this.state.loading}
                  slug={this.props.slug}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default FAQs;
