import React, { Component } from 'react';
import StaffSingle from './StaffSingle';

import {
  Redirect
} from 'react-router-dom';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import FullPageLoader from '../loaders/FullPageLoader';

class StaffDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      departments:[],
      locations:[],
      departmentFilter:"none",
      locationFilter:"none",
      nameFilter:"",
      termFilter:"",
      loading: true
    }
  }

  componentDidUpdate(prevProps, prevState){

    if (this.props.personToFind && this.props.personToFind !== prevProps.personToFind ) {
      let personString = this.props.personToFind.replace(/-/g, " ");
      this.setState({
        nameFilter: personString,
      });

    }

  }

  componentWillMount(){

    if (this.props.personToFind) {
      let personString = this.props.personToFind.replace(/-/g, " ");
      this.setState({
        nameFilter: personString,
      });

    }

  }

  componentDidMount(){
    // const CATEGORIES = gql`
    //   {
    //     entries(section:[staffDirectory]){
    //       ...on StaffDirectory{
    //         pagesConnection{
    //           entries{
    //             ...on Staff{
    //               id
    //               staffMemberName
    //               slug
    //               image{
    //                 url(transform: staffDirectory)
    //                 filename
    //                 title
    //                 height
    //                 width
    //               }
    //               jobTitle
    //               email
    //               phoneNumber
    //               department{
    //                 title
    //               }
    //               staffLocationsConnection{
    //                 entries{
    //                   title
    //                   url
    //                 }
    //               }
    //               scheduleAppointmentLink
    //               applyLinks{
    //                 purchase
    //                 refinance
    //                 construction
    //               }
    //             }
    //           }
    //         }

    //       }
    //     }
    //     department:categories(groupId:5){
    //       id
    //       title
    //     }
    //     location:entries(section:[locations]){
    //       id
    //       title
    //     }
    //   }
    // `;

    // // Get the preview token from the URL
      //  let m = document.location.href.match(/\btoken=([^&]+)/);
      //  let token = m ? m[1] : '';
        // Then forward that on whenever you are sending a CraftQL API request
      //  let url = `graph-api?token=${token}`;
    // const client = new ApolloClient({
    //   uri: `${process.env.REACT_APP_BASE_URL}${url}`,
    //   request: operation => {
    //     operation.setContext({
    //       headers: {
    //         Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
    //       },
    //     });
    //   },
    // });

    // client
    //   .query({
    //     query: CATEGORIES,
    //   })
    //   .then(response => {
    //     // //console.log(response.data.entries);
    //     // //console.log(response);

    //     this.setState({
    //       entries: response.data.entries[0].pagesConnection.entries,
    //       departments: response.data.department,
    //       locations: response.data.location,
    //       loading: false
    //     });
    //   });


      if (this.props.personToFind != null) {
        let personString = this.props.personToFind.replace(/-/g, " ");
        this.routeName(personString);
      }
  }

  changedDepartment(){
    //console.log('we are changing departments!~!');
    let val = this.departmentFilter;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      departmentFilter: data,
    })
  }

  changedLocation(){
    //console.log('we are changing locations!!!');
    let val = this.locationFilter;
    let data = val.options[val.selectedIndex].value;
    this.setState({
      locationFilter: data,
    })
  }

  changedName(){
    //console.log(this.nameFilter.value);
    this.setState({
      nameFilter: this.nameFilter.value,
    });
  }

  routeName(name){

    this.setState({
      nameFilter: name,
    });
  }



  render() {

    const Fragment = React.Fragment;


    const CATEGORIES = gql`
      {
        entries(section:[staffDirectory]){
          ...on StaffDirectory{
            pagesConnection{
              entries{
                ...on Staff{
                  id
                  staffMemberName
                  slug
                  image{
                    url(transform: staffDirectory)
                    filename
                    title
                    height
                    width
                  }
                  jobTitle
                  email
                  phoneNumber
                  showLoPage
                  department{
                    title
                  }
                  staffLocationsConnection{
                    entries{
                      title
                      url
                    }
                  }
                  scheduleAppointmentLink
                  applyLinks{
                    purchase
                    refinance
                    construction
                  }
                }
              }
            }

          }
        }
        department:categories(groupId:5){
          id
          title
        }
        location:entries(section:[locations]){
          id
          title
        }
      }
    `;










    return (

      <div className="container offsetNav">
        <Query query={CATEGORIES}>
          {({ loading, error, data }) => {


          if (loading) return <FullPageLoader />;
          if (error) return <Redirect to={'/not-found'}/>;


          var datas = data.entries[0].pagesConnection.entries;
          var locations = data.location;
          var departments = data.department;

          // console.log('look here!');
          // console.log(data);


          return(
            <Fragment>
              <h1 className="staff-heading fontSize5 text-center pb-2">Staff Directory</h1>
              <div className="filter-list-holder mb-4">

                <select className="departments-filter select mr-2" aria-label="filter by department" ref={(departmentFilter) => { this.departmentFilter = departmentFilter; }} onChange={() => this.changedDepartment()}>
                  <option value="none">Select a Department</option>
                  {departments.map((d,i)=>{
                    return(
                      <option value={d.title} key={'department'+i}>{d.title}</option>
                    );
                  })};
                </select>
                <select className="locations-filter select mr-2" aria-label="filter by name" ref={(locationFilter) => { this.locationFilter = locationFilter; }} onChange={() => this.changedLocation()}>
                  <option value="none">Select a Location</option>
                  {locations.map((c,e)=>{
                    return(
                      <option value={c.title} key={'location'+e}>{c.title}</option>
                    );
                  })};
                </select>
                <input className="name-filter-input mr-2" aria-label="filter by name" ref={(nameFilter) => { this.nameFilter = nameFilter; }} onChange={() => this.changedName()} placeholder="Search by Name" value={this.state.nameFilter}/>
              </div>
              <div className="container--sm">
              </div>


              <div className="staff-list-holder">

              {datas.map((d,i)=>{
                return(
                  <StaffSingle key={i} info={d} deptFilter={this.state.departmentFilter} locFilter={this.state.locationFilter} nameFilter={this.state.nameFilter}/>
                );
              })}



              </div>

            </Fragment>
          );
        }}
        </Query>

      </div>
    );
  }
}

export default StaffDirectory;
