import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import AccordionItem from './AccordionItem';

import {Helmet} from "react-helmet";

import FullPageLoader from '../loaders/FullPageLoader';

// apollo

import ApolloClient, { gql } from 'apollo-boost';


class FaqCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      loading: true,
      selectedIndex: -1,
    }
  }


  componentDidUpdate(prevProps, prevState) {

      if(this.props.cats !== prevProps.cats || (this.props.slug && this.props.slug !== prevProps.slug)){
        //console.log('%c Has been updated, now we need to make netwrok call', 'background: #222; color: #bada55');
        this.setState({loading:true});
        for (var i = 0; i <= this.props.cats.length -1; i++) {
          if (this.props.slug === this.props.cats[i].slug) {
            //console.log('%c We have a match! ', 'background: #222; color: red');

            this.setState({title:this.props.cats[i].title, selectedIndex:i});
            let CATEGORIES = gql`
            {
              entries(section:[faqs], relatedTo:[{element:${this.props.cats[i].id}}]){
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

          // Get the preview token from the URL
          let m = document.location.href.match(/\btoken=([^&]+)/);
          let token = m ? m[1] : '';

          // Then forward that on whenever you are sending a CraftQL API request
          let url = `graph-api?token=${token}`;
          let client = new ApolloClient({
            uri: `${process.env.REACT_APP_BASE_URL}${url}`,
            request: operation => {
              operation.setContext({
                headers: {
                  Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
                },
              });
            },
          });

          client
            .query({
              query: CATEGORIES,
            })
            .then(response => {
              //console.log(response.data.entries);

              this.setState({
                faqs: response.data.entries,
                loading: false,
              });
            });
          }
        }
      }
  }

  componentDidMount(){

    //console.log(this.props.cats);
    //console.log(this.props.slug);



    if(this.props.cats){
      //console.log('%c Has been updated, now we need to make netwrok call', 'background: #222; color: #bada55');
      for (var i = 0; i <= this.props.cats.length -1; i++) {
        if (this.props.slug === this.props.cats[i].slug) {
          //console.log('%c We have a match! ', 'background: #222; color: red');
          this.setState({title:this.props.cats[i].title, selectedIndex:i});
          let CATEGORIES = gql`
          {
            entries(section:[faqs], relatedTo:[{element:${this.props.cats[i].id}}]){
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

        // Get the preview token from the URL
        let m = document.location.href.match(/\btoken=([^&]+)/);
        let token = m ? m[1] : '';

        // Then forward that on whenever you are sending a CraftQL API request
        let url = `graph-api?token=${token}`;
        let client = new ApolloClient({
          uri: `${process.env.REACT_APP_BASE_URL}${url}`,
          request: operation => {
            operation.setContext({
              headers: {
                Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
              },
            });
          },
        });

        client
          .query({
            query: CATEGORIES,
          })
          .then(response => {
            //console.log(response.data.entries);

            this.setState({
              faqs: response.data.entries,
              loading: false
            });
          });
        }
      }
    }
  }

  handleClick(){

  }



  render() {

    const faqs = this.state.faqs;
    const cats = this.props.cats;
    const title = this.state.title;

    return (
      <div id="faq-category" role="region" aria-labelledby="faq-category" className="offsetNav container--md">
        {
          (this.state.selectedIndex !== -1)
          ?
            <Helmet><title>{cats[this.state.selectedIndex].title}</title></Helmet>
          :
            ''
        }
        <div className="faq-category-inner mb-6">
          <div className="faq-category-column1 hide-desktop ">
            <ul className="faq-category-nav">
                {Object.keys(cats || {}).map((d, index) => {
                  return(
                    <li key={'cat'+index} className="faq-category-item">
                      <Link className="fontSize0 link-hover colorBrandSecondary mb-1" to={`/${cats[index].uri}`} >{cats[index].title}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="faq-category-column2">
            <h1 className="text-center fontSize5 mb-4">{title}</h1>

            <ul className="accordion stripe-lrg">
              {
                (this.state.loading === false)

                ?  faqs.map((d, index) => {

                    return (
                      <div key={'faq'+index}>

                          {Object.keys(d.description || {}).map(key=>{
                            if (key === 'content') {
                              let data = {description:{content:d.description.content}, heading:d.heading};
                              return(

                                <AccordionItem data={data} key={index} index={index} />
                              );
                            }
                            else{
                              return('');
                            }

                          })}
                      </div>

                    );
                  })
                : <FullPageLoader />
              }
            </ul>


          </div>

          {/*<div className="faq-category-column3">
            <p>
              Questions?
            </p>
            <p>
              Phone number, call center hours, live chat link.
            </p>
          </div>*/}

        </div>
      </div>
    );
  }
}

export default FaqCategory;
