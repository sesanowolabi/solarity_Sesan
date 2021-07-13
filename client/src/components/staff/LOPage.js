import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';

import {Helmet} from "react-helmet";

import FullPageLoader from '../loaders/FullPageLoader';

// apollo

import ApolloClient, { gql } from 'apollo-boost';

import RatesCalculator from '../ratesCalculator/RatesCalculator';

class LOPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      loading: true,
      found: true,
    }

    this.usedCalc = this.usedCalc.bind(this);
  }


  usedCalc(){
    //this is where any trackinig will be done for use of the rates calc that is put on this page
  }



  componentDidMount(){
    const LO = gql`
      {
        entry(slug:"${this.props.slug}"){
          ...on Staff{
            id
            staffMemberName
            image{
              url
              filename
              title
            }
            speaksSpanish
            scheduleAppointmentLink
            phoneNumber
            nmls
            email
            applyLinks{
              purchase
            }
            description{
              content
            }
            staffRichText{
              content
            }
          }
        }
        globals{
          mortgageProcess{
            heading
            description{
              content
            }
            linksTo{
              uri
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
        query: LO,
      })
      .then(response => {
        // console.log(response);
        if(response.data.entry === null){
            this.setState({
              found: false,
            });
          } else {
            this.setState({
              data: response.data.entry,
              globals: response.data.globals.mortgageProcess,
              loading: false
            });
          }


        // console.log(response.data.entry)
        // console.log(response.data.globals.mortgageProcess)
      });
  }



  render() {
    const data = this.state.data;
    const globals = this.state.globals;

    if (!this.state.found) {
      return (<Redirect to={'/not-found'} />);
    }

    return (
      <div className="offsetNav lo-page ">
        {(this.state.loading === false ) ?

          <div className="">
            <Helmet><title>{data.staffMemberName}</title></Helmet>
            <div className="bg-image">
              <div className="opac-overlay brandSecondary" style={{backgroundImage: "url('/img/lo-house.png')"}}></div>
              <div className="grid stripe_9 ">
                <div className="grid1of3 row-centered">
                  <div className="bio-img align-center block " style={{backgroundImage: 'url('+ data.image[0].url +')'}}></div>

                  <h1 className="white fontSize3 mb-0">{data.staffMemberName}</h1>
                  <h2 className="white fontSize1 mt-0 mb-0">NMLS ID: {data.nmls}</h2>
                  <p className="white spanish mt-0 mb-1">{(data.speaksSpanish !== false) ? 'Habla Español' : ''}</p>


                </div>
                <div className="grid2of3 ">
                  <div className="white valign fontSize2 pr-2 inner_4 ">

                      <span className="fontBold inline-block"></span>
                      <div className="inline-block white" dangerouslySetInnerHTML={{__html: data.description.content}}></div>


                  </div>
                </div>
              </div>
            </div>
            <div className="grid mt-4 ">
              <div className="grid1of3 mt-2 pt-4 pb-4 row-centered grey2 borderradius--large pt-2 pb-2">

                <a href={`tel:${data.phoneNumber}`} className=" block pb-1 colorGrey4">
                  <span className="feather icon-phone-call pr-1"></span> {data.phoneNumber}
                </a>

                <a href={`mailto:${data.email}`} className="block pb-1 colorGrey4"> <span className="feather icon-mail pr-1"></span>{data.email}</a>
                {
                  (data.scheduleAppointmentLink)
                  ?
                    <Link to={`/schedule/${data.scheduleAppointmentLink}`} className="colorBrandSecondary block">Schedule Appointment</Link>
                  :
                    ''
                }
                <a href={data.applyLinks[0].purchase} className="button btn-apply mt-3 brandPrimary" target="_blank">Apply Online</a>

              </div>
              <div className="grid2of3 pl-2 pb-6">

                <h1 className="fontSize4 colorGrey5">{globals.heading}</h1>
                <div className="colorGrey4" dangerouslySetInnerHTML={{__html: globals.description.content}}></div>

                <Link to={`/${globals.linksTo[0].uri}`} className="button brandPrimary ml-2 mt-4"> Learn More About The Lending Process</Link>
              </div>
            </div>
            {
              (data.staffRichText)
              ?
                <div className="grid stripe_8">
                  <div className="grid1of1 inner_6" dangerouslySetInnerHTML={{__html: data.staffRichText.content}}></div>
                </div>
              :
                ''
            }


            <div className="full-width rates-gray-background stripe_8">
              <RatesCalculator
                market={'yakima'}
                slug={'lo'}
                usedCalc={this.usedCalc}
                queryString={''}/>
            </div>
          </div>

        : <FullPageLoader />}
      </div>

    );
  }
}

export default LOPage;
