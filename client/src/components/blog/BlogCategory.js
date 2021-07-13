import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {Helmet} from "react-helmet";

// apollo

import ApolloClient, { gql } from 'apollo-boost';

import StackGrid from "react-stack-grid";

import FullPageLoader from '../loaders/FullPageLoader';


class BlogCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      entries:[],
      loading: true,
      metaInfo:{image:[]},
      filter: 'hidden'
    }
    this.openFilter = this.openFilter.bind(this);

    this.grid = React.createRef();


    this.openFilter = this.openFilter.bind(this);

    this.updateLayout = this.updateLayout.bind(this);
  }


  updateLayout(){
    console.log('updating grid?')
    this.grid.updateLayout();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (nextState.entries.length > 1) {
    //   //console.log('we are updating the state of...');
    //   //console.log(nextState);
    // }

    // if (this.props.slug && this.props.slug !== prevProps.slug) {

    if(this.props.cats !== prevProps.cats || (this.props.slug && this.props.slug !== prevProps.slug)){
      this.setState({loading: true});
      for (var i = 0; i <= this.props.cats.length -1; i++) {
        if (this.props.slug === this.props.cats[i].slug) {

            const CATEGORIES = gql`
              {
                entries(section:[articles], relatedTo:[{element:${this.props.cats[i].id}}]){
                  id
                  title
                  uri
                  ...on Articles{
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
                     blogCategories{
                       title
                       slug
                       uri
                     }
                   }
                 }

                 categories(groupId: 4){
                   id
                   title
                   uri
                   ...on BlogCategory{
                      metaTitle
                      metaDescription
                      metaImage{
                        url
                        height
                        width
                        title

                      }
                    }
                 }
                }
            `;

            // //console.log(this.props.cats[i]);
            this.setState({activeCategory: this.props.cats[i].title});
            let chosen = i;

            // Get the preview token from the URL
            let m = document.location.href.match(/\btoken=([^&]+)/);
            let token = m ? m[1] : '';

            // Then forward that on whenever you are sending a CraftQL API request
            let url = `graph-api?token=${token}`;

            const client = new ApolloClient({
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
                    entries: response.data.entries,
                    categories: response.data.categories,
                    metaInfo: {title:response.data.categories[chosen].metaTitle, description:response.data.categories[chosen].metaDescription, image:response.data.categories[chosen].metaImage},
                    loading: false
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
                let chosen = i;
                this.setState({title:this.props.cats[i].title});
                let CATEGORIES = gql`
                {
                entries(section:[articles], relatedTo:[{element:${this.props.cats[i].id}}]){
                  id
                  title
                  uri
                  ...on Articles{
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
                     blogCategories{
                       title
                       slug
                       uri
                     }
                   }
                 }

                 categories(groupId: 4){
                    id
                    title
                    uri
                    ...on BlogCategory{
                      metaTitle
                      metaDescription
                      metaImage{
                        url
                        height
                        width
                        title

                      }
                    }

                 }
                }
              `;
              this.setState({activeCategory: this.props.cats[i].title});

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
                  console.log(response.data);

                  this.setState({
                    entries: response.data.entries,
                    categories: response.data.categories,
                    metaInfo: {title:response.data.categories[chosen].metaTitle, description:response.data.categories[chosen].metaDescription, image:response.data.categories[chosen].metaImage},
                    loading: false
                  });
                });



              }
            }

          }
      }

      openFilter(){
        if(this.state.filter === 'hidden'){
          this.setState({filter: 'visible'})
        } else {
          this.setState({filter: 'hidden'})
        }
      }


  render() {
    let data = this.state.entries;
    let categories = this.state.categories;

    //this sets width of stack grid columns if window is less than 420 pixels wide.
    let sw = (window.innerWidth < 420) ? window.innerWidth - 20 : 400;

    return (
      <div className="offsetNav clearfix">
        <h1 className="fontSize5 colorBrandSecondary text-center mb-0">Articles</h1>
        <div className="stripe_6">
          {(this.state.loading === false) ?
            <div className="blog-category-filter container stripe_6 clearfix">
              {
                 (this.state.metaInfo.image.length > 0)
                 ?
                   <Helmet>
                     <title>{this.state.metaInfo.title}</title>
                     <meta name="description" content={this.state.metaInfo.description}/>
                     <meta property="og:title" content={this.state.metaInfo.title} />
                     <meta property="og:type" content="website" />
                     <meta property="og:url" content={this.state.metaInfo.url} />
                     <meta property="og:image" content={this.state.metaInfo.image[0].url} />
                     <link rel="canonical" href={this.state.metaInfo.url} />

                   </Helmet>
                 :
                   <Helmet>
                     <title>{this.state.metaInfo.title}</title>
                     <meta name="description" content={this.state.metaInfo.description}/>
                     <meta property="og:title" content={this.state.metaInfo.title} />
                     <meta property="og:type" content="website" />
                     <meta property="og:url" content={this.state.metaInfo.url} />
                     <link rel="canonical" href={this.state.metaInfo.url} />
                   </Helmet>

               }
              <div className="filter-toggle pb-4" onClick={this.openFilter}>
                Show me
                  <div className="active-category ml-1">
                    {this.state.activeCategory}
                    {(this.state.filter === 'visible') ? <span className="feather icon-chevron-up"></span> : <span className="feather icon-chevron-down"></span>}
                  </div>
              </div>
              <div className={"categories grid7of12 noGutter " + this.state.filter}>
                  <div className="grid1of4 pb-3">
                      <Link to="/blog" className="link-hover" onClick={this.openFilter}>Everything</Link>
                  </div>
                {categories.map((c, index) => {
                  return (
                    <div className="grid1of4 pb-3" key={`cats-${index}`}>
                      <Link to={`/${c.uri}`} key={index} className="link-hover" onClick={this.openFilter}>{c.title}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          : '' }


          {(this.state.loading === false) ?
          <section className="">

          <StackGrid
            gridRef={grid => this.grid = grid}
            columnWidth={sw}
            itemComponent="span"
            gutterWidth={32}
            gutterHeight={32}
          >


            {data.map((d, index) => {
              let h = parseInt(d.hero[0].image[0].height, 10);
              let w = parseInt(d.hero[0].image[0].width, 10);

              //console.log(`this images width and height is ${w} X ${h}`);

              //if the columnWidth variable in stack grid changes, the 400 in the following line needs to match.
              let newHeight = (h / w) * 400;
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
            </StackGrid>
            </section>

        : <FullPageLoader />}

        </div>
      </div>
    );
  }
}

export default BlogCategory;
