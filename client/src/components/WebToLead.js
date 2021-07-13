import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
//import {Helmet} from "react-helmet";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
//loaders
import FullPageLoader from './loaders/FullPageLoader';

import BasicBlocks from './content-blocks/basic-blocks/BasicBlocks';
import Hero from './content-blocks/hero/Hero';
//graphql query parts
import basicBlocksQuery from './querys/BasicBlocks.js';
import heroQuery from './querys/HeroQuery.js';
//import metaQuery from './querys/MetaQuery.js';



class WebToLead extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: true,
	    	found: true,
	    }
	};


  render() {


  	var BASIC_PAGE_QUERY = gql`
    {
      entry(slug:"${this.props.slug}"){

        ...on Brand{

          title

          ${heroQuery.heroQuery}

          ${basicBlocksQuery.basicBlocksQuery}

        }
      }
    }
    `;



	if (!this.state.found) {
      return (<Redirect to={'/not-found'} />);
    }

    return (

        <Query client={this.props.client} query={BASIC_PAGE_QUERY}>
          {({ loading, error, data }) => {

            if (loading) return <FullPageLoader />;
            if (error) return <Redirect to={'/not-found'} />;
            if (data.entry  === null) return <Redirect to={'/not-found'} />;
            console.log('logging some data to compare...');
            console.log(data);
            // console.log(this.state.hero);
            // console.log(this.state.basicBlocks);

            return (
	            <div className="offsetNav">
								<form action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
									<input type="hidden" name="oid" value="00D7A000000DM6G">
									<input type="hidden" name="retURL" value="https://solaritycu.org/">
									<input type="hidden" name="recordType" id="recordType" value="0121U000000KI1UQAW">
									<label for="first_name">First Name</label>
									<input  id="first_name" maxlength="40" name="first_name" size="20" type="text"><br>
									<label for="last_name">Last Name</label>
									<input  id="last_name" maxlength="80" name="last_name" size="20" type="text"><br>
									<span>Member Number:</span>
									<input  id="00N1U00000TGPGB" maxlength="10" name="00N1U00000TGPGB" size="20" type="text"><br>
									<label for="email">Email</label>
									<input  id="email" maxlength="80" name="email" size="20" type="text"><br>
									<label for="phone">Phone</label>
									<input  id="phone" maxlength="40" name="phone" size="20" type="text"><br>
									<label for="mobile">Mobile</label>
									<input  id="mobile" maxlength="40" name="mobile" size="20" type="text"><br>
									<span>Lead Source Description:</span>
									<select  id="00N7A000001GWVU" name="00N7A000001GWVU" title="Lead Source Description">
										<option value="">--None--</option>
										<option value="Experian">Experian</option>
										<option value="Outbound Call List">Outbound Call List</option>
										<option value="Email Campaigns">Email Campaigns</option>
										<option value="Event">Event</option>
										<option value="Organic">Organic</option>
										<option value="Facebook">Facebook</option>
										<option value="Zillow">Zillow</option>
										<option value="Walk in">Walk in</option>
										<option value="Member referral">Member referral</option>
										<option value="Non-Member Referral">Non-Member Referral</option>
										<option value="Google Paid">Google Paid</option>
										<option value="Center of Influence">Center of Influence</option>
										<option value="Click to call Google Organic">Click to call Google Organic</option>
										<option value="Click to call Landing Page">Click to call Landing Page</option>
										<option value="Click to call Google Paid">Click to call Google Paid</option>
										<option value="Click to call Social">Click to call Social</option>
										<option value="Click to call Audio">Click to call Audio</option>
										<option value="Click to call Display">Click to call Display</option>
										<option value="Branches – Ellensburg">Branches – Ellensburg</option>
										<option value="Branches – North 5th">Branches – North 5th</option>
										<option value="Branches – Selah">Branches – Selah</option>
										<option value="Branches – West Side">Branches – West Side</option>
										<option value="Branches – Toppenish">Branches – Toppenish</option>
										<option value="Branches – Engagement Center">Branches – Engagement Center</option>
										<option value="Branches – Terrace Heights">Branches – Terrace Heights</option>
										<option value="Member Contact Center">Member Contact Center</option>
										<option value="Home Loan Production">Home Loan Production</option>
										<option value="Loan Servicing">Loan Servicing</option>
										<option value="Marketing">Marketing</option>
										<option value="Member Business Services">Member Business Services</option>
										<option value="Accounting">Accounting</option>
										<option value="Audit">Audit</option>
										<option value="Board of Directors">Board of Directors</option>
										<option value="Business Intelligence">Business Intelligence</option>
										<option value="Central Processing">Central Processing</option>
										<option value="Central Operations">Central Operations</option>
										<option value="Credit Quality">Credit Quality</option>
										<option value="Debt Solutions">Debt Solutions</option>
										<option value="Digital Experience">Digital Experience</option>
										<option value="Executive Team">Executive Team</option>
										<option value="Facilities/Purchasing">Facilities/Purchasing</option>
										<option value="Finance">Finance</option>
										<option value="Human Resources and Training">Human Resources and Training</option>
										<option value="Information Technology">Information Technology</option>
										<option value="Member Experience (CX)">Member Experience (CX)</option>
										<option value="Home Loan Processing and Underwriting">Home Loan Processing and Underwriting</option>
										<option value="Project Management Office">Project Management Office</option>
										<option value="Risk management">Risk management</option>
										<option value="User Experience">User Experience</option>
										<option value="Converted to App">Converted to App</option>
									</select><br>
									<span>Channel Description:</span>
									<select  id="00N7A000001GWVe" name="00N7A000001GWVe" title="Channel Description">
										<option value="">--None--</option>
										<option value="contactus@solaritycu.org">contactus@solaritycu.org</option>
										<option value="Mortgage Hippo – Borrower">Mortgage Hippo – Borrower</option>
										<option value="Mortgage Hippo – Lender">Mortgage Hippo – Lender</option>
										<option value="Physical Location">Physical Location</option>
										<option value="Calls">Calls</option>
										<option value="Purchased List">Purchased List</option>
										<option value="Existing Member data">Existing Member data</option>
										<option value="Mortgageconcierge@solaritycu.org">Mortgageconcierge@solaritycu.org</option>
										<option value="Mortgage Cadence">Mortgage Cadence</option>
									</select><br>
									<span>Preferred Method of Contact:</span>
									<select  id="00N1U00000TGPGG" name="00N1U00000TGPGG" title="Preferred Method of Contact"><option value="">--None--</option>
										<option value="Phone">Phone</option>
										<option value="Email">Email</option>
										<option value="Text">Text</option>
									</select><br>
									<span>Best Contact Time:</span>
									<select  id="00N1U00000TGPFf" name="00N1U00000TGPFf" title="Best Contact Time">
										<option value="">--None--</option>
										<option value="8:00AM-10:00AM">8:00AM-10:00AM</option>
										<option value="10:00AM-12:00PM">10:00AM-12:00PM</option>
										<option value="12:00PM-2:00PM">12:00PM-2:00PM</option>
										<option value="2:00PM-4:00PM">2:00PM-4:00PM</option>
										<option value="4:00PM-6:00PM">4:00PM-6:00PM</option>
									</select><br>
									<span>Spanish Speaker?:</span>
										<input  id="00N1U00000TGPGS" name="00N1U00000TGPGS" type="checkbox" value="1"><br>
									<span>Purpose:</span>
									<select  id="00N1U00000TGPGM" name="00N1U00000TGPGM" title="Purpose">
										<option value="">--None--</option>
										<option value="Construction">Construction</option>
										<option value="Purchase">Purchase</option>
										<option value="Refinance">Refinance</option>
									</select><br>
									<span>Vidyo Interaction?:</span>
									<input  id="00N1U00000TGPGY" name="00N1U00000TGPGY" type="checkbox" value="1"><br>
									<label for="street">Street</label><textarea name="street"></textarea><br>
									<label for="city">City</label>
									<input  id="city" maxlength="40" name="city" size="20" type="text"><br>
									<label for="state">State/Province</label>
									<input  id="state" maxlength="20" name="state" size="20" type="text"><br>
									<label for="zip">Zip</label>
									<input  id="zip" maxlength="20" name="zip" size="20" type="text"><br>
									<span>Amount:</span>
									<input  id="00N1U00000TGPFd" name="00N1U00000TGPFd" size="20" type="text"><br>
									<label for="description">Description</label><textarea name="description"></textarea><br>
									Promo Code (if any):<input  id="00N1U00000TGPGK" maxlength="30" name="00N1U00000TGPGK" size="20" type="text"><br>
									<span>Vidyo Location:</span>
									<select  id="00N1U00000TGPGZ" name="00N1U00000TGPGZ" title="Vidyo Location">
										<option value="">--None--</option>
										<option value="Ellensburg">Ellensburg</option>
										<option value="Engagement Center">Engagement Center</option>
										<option value="North 5th - Room 1">North 5th - Room 1</option>
										<option value="North 5th - Room 2">North 5th - Room 2</option>
										<option value="Selah">Selah</option>
										<option value="Toppenish">Toppenish</option>
										<option value="Westside">Westside</option>
									</select><br>
									<span>Teller Name:</span>
									<input id="00N7A000001Nlau" maxlength="50" name="00N7A000001Nlau" size="20" type="text"><br>
									<input type="submit" name="submit">
								</form>
  		        </div>
            );
          }}
        </Query>

    );
  }
}


export default WebToLead;
