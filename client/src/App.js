import React, { Component, Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {Helmet} from "react-helmet";

//ie11 imports for map and set
import 'core-js/es/map';
import 'core-js/es/set';

// redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import MainReducer from './redux/main-reducer.js';

// apollo
import ApolloClient, { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

//import PageRevealLoader from "./components/loaders/PageRevealLoader";

// import mixpanel from 'mixpanel-browser';
// import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel';

// components
// import Home from './Home';
// import NotFound from './NotFound';
// import SiteSearchPage from './components/SiteSearchPage';

//import ScrollToTop from './ScrollToTop';

// import AllLocations from './components/AllLocations';
// import BasicPages from './components/BasicPages';

// import Company from './components/company/Company';
// import CompanySingle from './components/company/CompanySingle';

// import Blog from './components/blog/Blog';
// import BlogSingle from './components/blog/BlogSingle';
// import BlogCategory from './components/blog/BlogCategory';

// import Careers from './components/careers/Careers';
// import CareerSingle from './components/careers/CareerSingle';
// // import JobListings from './components/careers/JobListings';

// import DepositComparison from './components/deposit-comparison/DepositComparison';

// import Fees from './components/fees/Fees';

// import Contact from './components/contact/Contact';


// //individual pages coomponents
// import StaffDirectory from './components/staff/StaffDirectory';

// import LOPage from './components/staff/LOPage';
// import FAQs from './components/faqs/FAQs';
// import Rates from './components/rates/Rates';
// import FaqSingle from './components/faqs/FaqSingle';


// import Bank from './components/bank/Bank';
// import BankSingle from './components/bank/BankSingle';

// import Borrow from './components/borrow/Borrow';
// import BorrowSingle from './components/borrow/BorrowSingle';

// import Disclosures from './components/disclosures/Disclosures';
// import DisclosuresSingle from './components/disclosures/DisclosuresSingle';


// import FaqCategory from './components/faqs/FaqCategory';

// import Locations from './components/locations/Locations';

// import Schedule  from './components/schedule/Schedule';
// import ScheduleAppointment from './components/schedule/ScheduleAppointment';
// import ScheduleConfirmation from './components/schedule/ScheduleConfirmation';

// import RatesCalculator from './components/ratesCalculator/RatesCalculator';


// // navigation
import PrimaryNav from './components/navigation/PrimaryNav';
import FooterNav from './components/navigation/FooterNav';
// import LandingFooter from './components/navigation/LandingFooter';

// //landing pages
// import LandingPage from './components/landing-pages/LandingPage';
// import LandingPageBasic from './components/landing-pages/LandingPageBasic';
// import LandingPageRates from './components/landing-pages/LandingPageRates';
// import LandingPageRedirect from './components/landing-pages/LandingPageRedirect';
// import Realtor from './components/landing-pages/Realtor';

// // mqlf
// import MQLF from './components/mqlf/MQLF';

// //loaders
import FullPageLoader from './components/loaders/FullPageLoader';

// //sitemap
// import Sitemap from './components/sitemap/Sitemap';

//redirect component
// import RedirectComponent from './components/redirect/RedirectComponent';




//notifications
import NotificationBar from './components/notifications/NotificationBar';


//graphql query parts
// import basicBlocksQuery from '../querys/BasicBlocks.js';
// import heroQuery from '../querys/HeroQuery.js';
import metaQuery from './components/querys/MetaQuery.js';
import { render } from 'react-dom';




//and now.... we lazy load components for code splitting
//const  = lazy(() => import('./components/'));

// ********************* START CODE SPLITTING LOADING *********************




const Company = lazy(() => import('./components/company/Company'));
const CompanySingle = lazy(() => import('./components/company/CompanySingle'));
const Blog = lazy(() => import('./components/blog/Blog'));
const BlogSingle = lazy(() => import('./components/blog/BlogSingle'));
const BlogCategory = lazy(() => import('./components/blog/BlogCategory'));

const Resources = lazy(() => import('./components/resources/Resources'));


const Careers = lazy(() => import('./components/careers/Careers'));
const CareerSingle = lazy(() => import('./components/careers/CareerSingle'));
const DepositComparison = lazy(() => import('./components/deposit-comparison/DepositComparison'));
const Fees = lazy(() => import('./components/fees/Fees'));
const Contact = lazy(() => import('./components/contact/Contact'));
const StaffDirectory = lazy(() => import('./components/staff/StaffDirectory'));
const LOPage = lazy(() => import('./components/staff/LOPage'));
const FAQs = lazy(() => import('./components/faqs/FAQs'));
const Rates = lazy(() => import('./components/rates/Rates'));
const FaqSingle = lazy(() => import('./components/faqs/FaqSingle'));
const Bank = lazy(() => import('./components/bank/Bank'));
const BankSingle = lazy(() => import('./components/bank/BankSingle'));
const Borrow = lazy(() => import('./components/borrow/Borrow'));
const BorrowSingle = lazy(() => import('./components/borrow/BorrowSingle'));
const Disclosures = lazy(() => import('./components/disclosures/Disclosures'));
const DisclosuresSingle = lazy(() => import('./components/disclosures/DisclosuresSingle'));
const FaqCategory = lazy(() => import('./components/faqs/FaqCategory'));
const Locations = lazy(() => import('./components/locations/Locations'));
//const Schedule = lazy(() => import('./components/schedule/Schedule'));
const ScheduleAppointment = lazy(() => import('./components/schedule/ScheduleAppointment'));
const ScheduleConfirmation = lazy(() => import('./components/schedule/ScheduleConfirmation'));
//const RatesCalculator = lazy(() => import('./components/ratesCalculator/RatesCalculator'));
const Stories = lazy(() => import('./components/stories/Stories'));
const StoriesSingle = lazy(() => import('./components/stories/StoriesSingle'));
const StoriesCategory = lazy(() => import('./components/stories/StoriesCategory'));

const LandingFooter = lazy(() => import('./components/navigation/LandingFooter'));
const LandingPage = lazy(() => import('./components/landing-pages/LandingPage'));
const LandingPageBasic = lazy(() => import('./components/landing-pages/LandingPageBasic'));
const LandingPageRates = lazy(() => import('./components/landing-pages/LandingPageRates'));
//const LandingPageRedirect = lazy(() => import('./components/landing-pages/LandingPageRedirect'));
const Realtor = lazy(() => import('./components/landing-pages/Realtor'));
const MQLF = lazy(() => import('./components/mqlf/MQLF'));
const Sitemap = lazy(() => import('./components/sitemap/Sitemap'));
const RedirectComponent = lazy(() => import('./components/redirect/RedirectComponent'));
const BasicPages = lazy(() => import('./components/BasicPages'));
const BrandPages = lazy(() => import('./components/BrandPages'));
const SiteSearchPage = lazy(() => import('./components/SiteSearchPage'));
const Home = lazy(() => import('./Home'));
const NotFound = lazy(() => import('./NotFound'));

// const PrimaryNav = lazy(() => import('./components/navigation/PrimaryNav'));
// const FooterNav = lazy(() => import('./components/navigation/FooterNav'));

// const NotificationBar = lazy(() => import('./components/notifications/NotificationBar'));



// ********************* END CODE SPLITTING LOADING *********************



class App extends Component {
  store = createStore(MainReducer, applyMiddleware(thunk));


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notifications: [],
      notificationsDismissed: [],
      redirects: [],
    }


    this.dismissNotifications = this.dismissNotifications.bind(this);

  }

  dismissNotifications(index){
    
    let temp = this.state.notificationsDismissed;
    temp[index] = true;
    this.setState({
      notificationsDismissed: temp,
    })
  }

  componentDidMount(){


    // hotjar.initialize(1134466, 6);

    // ReactGA.initialize('UA-60544531-4');
    // ReactGA.pageview(window.location.pathname + window.location.search);

    // const tagManagerArgs = {
    //     gtmId: 'GTM-KPT6XJ6'
    // }

    // TagManager.initialize(tagManagerArgs);
    // console.log(this.props);
    // console.log(this.state);
  }

  componentDidUpdate(PrevProps, PrevState){
    // console.log('something updated....');
    // console.log(PrevProps);
    // console.log(PrevState);
  }

  componentWillMount(){


    // var string = window.location.href,
    // substring = "draft";

    // if (string.indexOf(substring) > 0 ) {
    //   console.log('%c This is a draft! ', 'background: #222; color: #bada55')
    // }
    // else{

    //   console.log('%c This is not a draft', 'background: #222; color: blue');
    // }

    const SAMPLE = gql`
      {

       data:globals{

          redirects{
            redirectMatrix{
              ...on RedirectMatrixRedirect{
                urlToRedirect
                directTo
              }
            }
          }


         primaryNavigation{
           navigation{
             ...on NavigationNavigationItem{
               id
               label
               labelLink:labelLinkConnection{
                 labelL:entries{
                   title
                   link:uri
                 }
               }
               list:linksConnection{
                 list:entries{
                   title
                   link:uri
                 }
               }
             }
           }
         }

         footerNavigation{
           navigation{
             ...on NavigationNavigationItem{
               id
               label
               list:linksConnection{
                 list:entries{
                   title
                   link:uri
                 }
               }
             }
           }
          subFooterLinks{
            title
            uri
          }
          footerDisclosures{
            content
          }
         }



         notifications{
          notifications{
            ...on NotificationsNotification{
              notificationTitle
              description
              startDate
              endDate                           
              pagesToDisplayOn{
                title
                slug
                id
                url
                uri
              }
              linkText
              linkURL 
            }
          }
        }

       }

       faqCats:categories(groupId:2){
         id
         title
         slug
         uri
       }

       blogCats:categories(groupId:4){
         id
         title
         slug
         uri
       }

       storiesCats:categories(group: storiesCategory){
         id
         title
         slug
         uri
       }

     }
    `;

    console.log('GraphAPi: ' + `${process.env.REACT_APP_BASE_URL}graph-api`);
    const client = new ApolloClient({
      uri: `${process.env.REACT_APP_BASE_URL}graph-api`,
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
        query: SAMPLE,
      })
      .then(response => {          
        // console.log(response.data.data.notifications.notifications);
        let temp  =  [];
        for(let i = 0; i < response.data.data.notifications.notifications.length; i++ ){
          temp[i] = false;
        }

        this.setState({
          redirects: response.data.data.redirects.redirectMatrix,
          primaryNav: response.data.data.primaryNavigation.navigation,
          footerNav: response.data.data.footerNavigation.navigation,
          notifications: response.data.data.notifications.notifications,          
          notificationsDismissed: temp,
          footerSubNav: response.data.data.footerNavigation.subFooterLinks,
          footerDisclosures: response.data.data.footerNavigation.footerDisclosures.content,
          faqCategories: response.data.faqCats,
          blogCategories: response.data.blogCats,
          storiesCategories: response.data.storiesCats,
          loading:false
        })
      });

  }


  render() {
    const feeQuery = gql`
    {
      feecats:categories(groupId:6){
        id
        title
      }
    }
    `;
    const disclosuresQuery = gql`
    {
      entries(section:[disclosures]){
        ...on Disclosures{
          title
          uri
        }
      }
    }`;

    const SITEMAP = gql`
    {
      entries(section:[sitemap], level:1){
        ...on Sitemap{
          id
          title
          level
          sitemapEntriesConnection{
            entries{
              title
              uri
            }
          }
          hasDescendants
          children{
            ...on Sitemap{
              id
              title
              level
              sitemapEntriesConnection{
                entries{
                  title
                  uri
                }
              }
              hasDescendants
               children{
                ...on Sitemap{
                  id
                  title
                  level
                  sitemapEntriesConnection{
                    entries{
                      title
                      uri
                    }
                  }
                  hasDescendants
                }
              }
            }
          }
        }
      }
    }`;

    const ratesQuery = gql`
    {
      entries(section:[ratesPage]){
        ...on RatesPage{
          id
          title
          ratesPageUpdated @date(as:"F j, Y")
          ${metaQuery.metaQuery}
          pagesConnection{
            entries{
              ...on Rates{
                title
                rateTableTitles{
                  col1:table1stColumnTitle
                  col2:table2ndColumnTitle
                  col3:table3rdColumnTitle
                }
                rates{
                  col1:table1stColumnValue
                  col2:table2ndColumnValue
                  col3:table3rdColumnValue
                }
                ratesAdditionalDetails{
                  title
                  detail
                }
                additionalInfo{
                  content
                }
              }
            }
          }
        }
      }
    }
    `;

    const contactQuery = gql`
    {
      data:globals{
        contactFooter{
          contactPhoneNumber
          contactCenterHours{
            ...on ContactCenterHoursDay{
              dayName
              dayStartTime
              dayEndTime
            }
          }
        }
      }
    }
    `;


    const LOCATIONS_QUERY = gql`
    {
      entry(section:[locationsPage]){
        ...on LocationsPage{
          url
          metaTitle
          metaDescription
          metaImage{
            title
            url
            height
            width
          }
        }
      }
    }
    `;



    const LOAN_SCHEDULE = gql`
    {
      globals{
        staffMeetingAvailability{
          available:loanOfficerMeetingAvailability{
            ...on Staff{
              slug
              staffName:title
              staffImage:image{
                id
                filename
                height
                width
              }
              staffEmail:email
              staffTitle:jobTitle
              department{
                title
              }
              locationConnection:staffLocationsConnection{
                entries{
                  ...on Locations{
                    title
                    address{
                      streetAddress
                      city
                      state
                      zip
                    }
                    latitude
                    longitude
                  }
                }
              }
            }
          }

          meetingTypes:loanMeetingTypes{
            meetingName
            meetingDurationFormatted
            meetingDurationValue
            meetingDescription
            inPerson
          }
        }
      }
    }
    `;

    const CONTACT_SCHEDULE = gql`
    {
      globals{
        staffMeetingAvailability{
          available:contactAvailability{
            ...on Staff{
              slug
              staffName:title
              staffImage:image{
                id
                filename
                height
                width
              }
              staffEmail:email
              staffTitle:jobTitle
              department{
                title
              }
              locationConnection:staffLocationsConnection{
                entries{
                  ...on Locations{
                    title
                    address{
                      streetAddress
                      city
                      state
                      zip
                    }
                    latitude
                    longitude
                  }
                }
              }
            }
          }
          meetingTypes:contactMeetingTypes{
            meetingName
            meetingDurationFormatted
            meetingDurationValue
            meetingDescription
            inPerson
          }
        }
      }
    }
    `;

    const FINANCIAL_SCHEDULE = gql`
    {
      globals{
        staffMeetingAvailability{
          available:financialMeetingAvailability{
            ...on Staff{
              slug
              staffName:title
              staffImage:image{
                id
                filename
                height
                width
              }
              staffEmail:email
              staffTitle:jobTitle
              department{
                title
              }
              locationConnection:staffLocationsConnection{
                entries{
                  ...on Locations{
                    title
                    address{
                      streetAddress
                      city
                      state
                      zip
                    }
                    latitude
                    longitude
                  }
                }
              }
            }
          }
          meetingTypes:financialMeetingTypes{
            meetingName
            meetingDurationFormatted
            meetingDurationValue
            meetingDescription
            inPerson
          }
        }
      }
    }
    `;


    console.log(this.state);


    if (this.state.redirects.length > 0) {
      for(let i = 0; i < this.state.redirects.length; i++){
        //console.log(this.state.redirects)
      }

    }

    let usesNotification = true;

    const pathSegment = window.location.pathname;
    if (pathSegment.includes('/lp/')) {
      usesNotification = false;
    }

    return (
      <Provider store={this.store}>
        <BrowserRouter onUpdate={() => window.scrollTo(0,0)}>
        <Suspense fallback={<div></div>}>

          <div>

            <Helmet defaultTitle="Solarity Credit Union" titleTemplate="Solarity Credit Union | %s">
            </Helmet>
            
              
            {usesNotification && <NotificationBar notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} dismiss={this.dismissNotifications}/>}
            
            <Switch>


              <Route exact path="/" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <Home/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/company" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Company />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>

              <Route exact path="/company/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <CompanySingle slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>

              <Route exact path="/articles" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Blog />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/articles/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <BlogSingle slug={match.params.slug} client={this.props.client}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/articles-category/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <BlogCategory cats={this.state.blogCategories} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


               <Route exact path="/disclosures" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Helmet><title>Disclosures</title></Helmet>
                    <Query client={this.props.client} query={disclosuresQuery}>
                      {({ loading, error, data }) => {

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <Disclosures data={data.entries} />
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/disclosures/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <DisclosuresSingle slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>




              <Route exact path="/careers" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Careers />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/careers/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <CareerSingle slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/deposit-comparison" render={({match}) => (
                <div>
                  <Helmet><title>Deposit Comparison</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <DepositComparison />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/search" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <SiteSearchPage />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/resources" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Resources />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/faqs" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <FAQs/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/faqs/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <FaqSingle location={this.props.location} cats={this.state.faqCategories} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route path="/faq-category/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <FaqCategory location={this.props.location} slug={match.params.slug} cats={this.state.faqCategories} />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>



              <Route exact path="/rates" render={() => (
                <div>

                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={ratesQuery}>
                      {({ loading, error, data }) => {

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <React.Fragment>
                            {
                              (data.entries[0].metaImage.length > 0)
                              ?
                                <Helmet>
                                  <title>{data.entries[0].metaTitle}</title>
                                  <meta name="description" content={data.entries[0].metaDescription}/>
                                  <meta property="og:title" content={data.entries[0].metaTitle} />
                                  <meta property="og:type" content="website" />
                                  <meta property="og:url" content={data.entries[0].url} />
                                  <meta property="og:image" content={data.entries[0].metaImage[0].url} />
                                  <link rel="canonical" href={data.entries[0].url} />
                                </Helmet>
                              :
                                <Helmet>
                                  <title>{data.entries[0].metaTitle}</title>
                                  <meta name="description" content={data.entries[0].metaDescription}/>
                                  <meta property="og:title" content={data.entries[0].metaTitle} />
                                  <meta property="og:type" content="website" />
                                  <meta property="og:url" content={data.entries[0].url} />
                                  <link rel="canonical" href={data.entries[0].url} />
                                </Helmet>

                            }
                            <Rates data={data}/>
                          </React.Fragment>
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/locations" render={props => (
                <div>
                  <Helmet><title>Locations</title></Helmet>
                  <Query client={this.props.client} query={LOCATIONS_QUERY}>
                    {({ loading, error, data }) => {

                      if (loading) return '';
                      if (error) return '';
                      console.log('locations meta query...');
                      console.log(data);

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
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <Locations searchParam={props.location.search}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>



              <Route path="/locations/:slug" render={({match}) => (
                <div>
                  <Helmet><title>{`Locations - ${match.params.slug}`}</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <Locations specific={match.params.slug} searchParam=""/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route path="/pages/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />

                    <BasicPages location={this.props.location} slug={match.params.slug}/>

                    <Helmet>
                      <link rel='dns-prefetch' href='//munchkin.marketo.net' />
                      <link rel='dns-prefetch' href='//app-sj15.marketo.com' />
                      <link rel='stylesheet' id='ult_marketo_forms-css'  href='/marketo/ult_marketo_forms-public.css' type='text/css' media='all' />
                      <script src='//app-sj15.marketo.com/js/forms2/js/forms2.min.js'></script>
                      <script type='text/javascript' src='/marketo/ult_marketo_forms-public.js'></script>
                      <script type='text/javascript' src='/marketo/forms2.min.js'></script>
                      <script type='text/javascript' src='//munchkin.marketo.net/munchkin.js?ver=1.0.1'></script>
                    </Helmet>

                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/bank" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Bank />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route path="/bank/:slug" render={({match}) => (
                <div>

                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <BankSingle location={this.props.location} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>

              <Route exact path="/borrow" render={() => (
                <div>

                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Borrow />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>

              <Route path="/home-loans/:slug" render={({match}) => (
                <div>

                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <BorrowSingle location={this.props.location} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>



              <Route exact path="/staff-directory/:name?" render={({match}) => (
                <div>
                  <Helmet><title>Staff Directory</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <StaffDirectory personToFind={match.params.name}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>

              <Route exact path="/fees" render={() => (
                <div>
                  <Helmet><title>Fees</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={feeQuery}>
                      {({ loading, error, data }) => {

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <Fees feeCats={data.feecats} />
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/contact" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>

                  <Query client={this.props.client} query={contactQuery}>
                      {({ loading, error, data }) => {
                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (

                          <Contact data={data.data.contactFooter.contactCenterHours} phone={data.data.contactFooter.contactPhoneNumber}/>

                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/company" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Home />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route path="/lp/:market/rates" render={props => (
                <div>
                  <Helmet>
                    <script src="https://js.adsrvr.org/up_loader.1.1.0.js"></script>
                  </Helmet>
                    <LandingPageRates market={props.match.params.market} queryString={props.location.search}/>
                    <LandingFooter footerDisclosures={this.state.footerDisclosures} queryString={props.location.search}/>
                </div>
              )}/>

              <Route path="/lp/:market/:slug" render={props => (
                <div>
                  <Helmet>
                    <script src="https://js.adsrvr.org/up_loader.1.1.0.js"></script>
                  </Helmet>
                    {(props.match.params.slug === 'realtor') ? <Realtor slug={props.match.params.market} queryString={props.location.search}/> : <LandingPage market={props.match.params.market} slug={props.match.params.slug} queryString={props.location.search}/> }

                    <LandingFooter footerDisclosures={this.state.footerDisclosures} queryString={props.location.search}/>
                </div>
              )}/>

              <Route path="/lp/:slug" render={props => (
                <div>
                  <Helmet>
                    <script src="https://js.adsrvr.org/up_loader.1.1.0.js"></script>
                  </Helmet>
                    <LandingPageBasic
                      market={'yakima'}
                      slug={props.match.params.slug}
                      queryString={props.location.search}
                    />
                    <LandingFooter footerDisclosures={this.state.footerDisclosures} queryString={props.location.search}/>
                </div>
              )}/>



              {/*}

              <Route exact path="/schedule" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Schedule />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              {*/}

              <Route exact path="/schedule/loan-officer/:name?" render={({match}) => (
                <div>
                  <Helmet><title>Schedule Loan Officer</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={LOAN_SCHEDULE}>
                      {({ loading, error, data }) => {
                        // console.log('logging query data');
                        // console.log(data);

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <ScheduleAppointment data={data.globals.staffMeetingAvailability} meetingTypes={data.globals.meetingTypes} person={match.params.name}/>
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/schedule/contact-center/:name?" render={({match}) => (
                <div>
                  <Helmet><title>Schedule Contact Center</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={CONTACT_SCHEDULE}>
                      {({ loading, error, data }) => {
                        // console.log('logging query data');
                        // console.log(data);

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <ScheduleAppointment data={data.globals.staffMeetingAvailability} person={match.params.name}/>
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/schedule/financial-guide/:name?" render={({match}) => (
                <div>
                  <Helmet><title>Schedule Financial Guide</title></Helmet>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={FINANCIAL_SCHEDULE}>
                      {({ loading, error, data }) => {
                        // console.log('logging query data');
                        // console.log(data);

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <ScheduleAppointment data={data.globals.staffMeetingAvailability} person={match.params.name}/>
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>






              <Route exact path="/schedule-confirmation" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <ScheduleConfirmation />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/stories" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Stories />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/stories/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <StoriesSingle slug={match.params.slug} client={this.props.client}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route exact path="/stories-category/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <StoriesCategory
                      cats={this.state.storiesCategories}
                      slug={match.params.slug}
                    />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route exact path="/get-started-with-a-mortgage" render={props => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <MQLF queryString={props.location.search} />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>



              <Route exact path="/sitemap" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={SITEMAP}>
                      {({ loading, error, data }) => {

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;
                        return (
                          <Sitemap data={data.entries} />
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route path="/lo/:slug" render={({match}) => (
                <div>

                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <LOPage location={this.props.location} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>

                </div>
              )}/>


             {/* <Route exact path="/locations" render={() => {
                  return <AllLocations />;
              }}/>*/}


              <Route path="/brand/:slug" render={({match}) => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading} />
                    <BrandPages location={this.props.location} slug={match.params.slug}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>



              <Route exact path="/not-found" render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <NotFound />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>

              <Route render={props => (
                <React.Fragment>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <RedirectComponent redirects={this.state.redirects} loading={this.state.loading} location={props.location}/>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </React.Fragment>
              )}/>



{/*
              <Route render={props => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <Query client={this.props.client} query={REDIRECTS_QUERY}>
                      {({ loading, error, data }) => {

                        if (loading) return <FullPageLoader />;
                        if (error) return <Redirect to={'/not-found'}/>;

                        // console.log('logging in redirects query');
                        // console.log(data.globals.redirects.redirectMatrix);
                        // console.log(props);

                        let red = data.globals.redirects.redirectMatrix;
                        if (red.length > 0) {
                          for(let x = 0; x < red.length; x ++){
                            if (props.location.pathname === red[x].urlToRedirect) {
                              return <Redirect to={`/${red[x].directTo[0].uri}`}/>
                            }
                          }
                        }

                        return (
                          <NotFound />
                        );
                      }}
                    </Query>
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>
*/}

{/*



              <Route render={() => (
                <div>
                  <PrimaryNav notifications={this.state.notifications} dismissed={this.state.notificationsDismissed} data={this.state.primaryNav} loading={this.state.loading}/>
                    <NotFound />
                  <FooterNav data={this.state.footerNav} subData={this.state.footerSubNav} footerDisclosures={this.state.footerDisclosures} loading={this.state.loading}/>
                </div>
              )}/>


              <Route component={NotFound} />

*/}


            </Switch>


          </div>
          </Suspense>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
