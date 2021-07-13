import React, { Component } from 'react';

import Accordion from './Accordion';

import ApolloClient, { gql } from 'apollo-boost';


const Fragment = React.Fragment;


class DepositComparison extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	accordionData: [
	    		{
	    			data1:{heading: "Checking", description: "Versatile and streamlined checking available anywhere."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"No monthly maintenance fees"}, {text:"$50 minimum opening balance"}, {text:"Reimbursement of one box of Standard/Image checks once every 12 months for members 62 years of age and older"}, {text:"*Members must have a savings account to open a Checking Account"}]},
	    			data3:{rows:[{col1: "N/A", col2:"N/A", col3:"N/A"}]}
	    		},
	    		{
	    			data1:{heading: "Dividend Checking", description: "Dividend Checking is an easy-to-manage account that pays monthly dividends."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"Unlimited transactions and cash deposits"}, {text:"Minimum opening deposit is $100 and minimum daily balance is $250"}, {text:"Monthly service charge waived if $250 minimum daily balance is met"}, {text:"Members 62 years of age and older are eligible for free Standard/Image checks"}, {text:"*Members must have a savings account to open a Dividend Checking Account"}, {text:"Visa Account Updater (VAU) for all Visa cards"}]},
	    			data3:{rows:[{col1: "0.01%", col2:"0.01%", col3:"$250"}, {col1: "0.06%", col2:"0.06%", col3:"$5,000"}, {col1: "0.11%", col2:"0.11%", col3:"$25,000"}]}
	    		},
	    		{
	    			data1:{heading: "Savings", description: "A simple yet powerful way to reach your goals."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"No monthly maintenance fees"}, {text:"Secondary savings accounts available"}, {text:"Automate savings with an optional payroll deduction for a set amount or percentage of your paycheck"}, {text:"Minimum opening deposit is $5 and pays dividends on balances over $5"}, {text:"Monthly service charge waived if $100 minimum balance is maintained"}, {text:"Opening a checking account will reduce the minimum balance to $5"}, {text:"Up to <a href=\"https://www.solaritycu.org/fees\">six withdrawals</a> a month"}]},
	    			data3:{rows:[{col1: "0.05%", col2:"0.05%", col3:"$5"}]}
	    		},
	    		{
	    			data1:{heading: "Certificates", description: "A stable, secure place to watch your investment grow."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"$500 minimum deposit"}, {text:"Transfer dividends to a Checking or Savings account"}, {text:"One-time bump feature allows you to increase the rate of your certificate, depending on your certificate’s terms"}, {text:"Withdraw dividends at maturity without penalty"}, {text:"Three to 48-month terms (3, 6, 12, 24, 36, 48 mo.) (*rates may vary)"}, {text:"Guaranteed rate for the term of the certificate, after the minimum deposit is met"}]},
	    			data3:{rows:[{col1: "1.35%", col2:"1.36%", col3:"$500"}, {col1: "1.55%", col2:"1.56%", col3:"$10,000"}, {col1: "1.75%", col2:"1.76%", col3:"$75,000"}]}
	    		},
	    		{
	    			data1:{heading: "Youth", description: "Welcome to the smarter piggy bank."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"Online Banking"}, {text:"No monthly maintenance fees"}]},
	    			data3:{rows:[{col1: "N/A", col2:"N/A", col3:"N/A"}]}
	    		},
	    		{
	    			data1:{heading: "Money Market Advantage", description: "It’s savings—only with a higher yield."},
	    			data2:{heading: "Product at-a-glance", rows:[{text:"No monthly maintenance fees if minimum balance of $2000 is maintained"}, {text:"Up to <a href=\"https://www.solaritycu.org/fees\">six non-signature withdrawals</a> a month"}, {text:"Funds are accessible by check, through Online Banking or in person at the Credit Union"}, {text:"Members must have a Primary Savings Account to open a Money Market Advantage Account"}]},
	    			data3:{rows:[{col1: "0.10%", col2:"0.10%", col3:"$0.01 - $1,999"}, {col1: "0.10%", col2:"0.10%", col3:"$2,000 - $19,999"}, {col1: "0.20%", col2:"0.20%", col3:"$20,000 - $49,999"}, {col1: "0.30%", col2:"0.30%", col3:"$50,000 - $99,999"}, {col1: "0.40%", col2:"0.40%", col3:"$100,000+"}]}
	    		}
	    	],
	    	activeIndex: 0,
	    }
	    this.toggleItem = this.toggleItem.bind(this);
	};

	componentDidMount(){
	    const CATEGORIES = gql`
	        {
		     entries(section:[depositProducts]){
		          id
		          title

		    			...on DepositProducts {
		            depositComparisonConnection{
		              entries{
		                ... on Rates {
		                  title
		                  rateTableTitles{
		                    table1stColumnTitle
		                    table2ndColumnTitle
		                    table3rdColumnTitle
		                  }
		                  rates {
		                    table1stColumnValue
		                    table2ndColumnValue
		                    table3rdColumnValue
		                  }
		                  ratesAdditionalDetails{
		                    title
		                    detail
		                  }
		                  additionalInfo{
		                    content
		                  }
		                  depositChecklist{
			              	rowText
			              }
			              description{
			                content
			              }

		                }
		              }
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
	        query: CATEGORIES,
	      })
	      .then(response => {
	        this.setState({
	        	title: response.data.entries[0].title,
	          entries: response.data.entries[0].depositComparisonConnection.entries,
	          loading: false
	        });
	        // console.log(response.data.entries[0].depositComparisonConnection.entries,)
	      });
	  }

	  

	toggleItem(index){
		console.log(`you have clicked on the tab at index ${index}`);
		this.setState({
			activeIndex: index,
		});
	}

  render() {
	let applyLink;
    return (

        <div className="offsetNav">


			<div className="hide-desktop borderradius--small" style={{overflow: "hidden"}}>
				<div className="grid1of1 pt-4 text-center fontSize2 deposit-comparison mb-0">
					<h2>Explore Our Deposit Products</h2>
					<div>
						{(this.state.loading === false) ?

							<ul>

								{this.state.entries.map((item, index) => {
									return(
										<li key={`deposit-${index}`}>
											<div onClick={() => this.toggleItem(index)} className={"fontSize0 slider-headline " + ((this.state.activeIndex === index) ? "active-nav " : " ")}>
												{item.title}

											</div>
										</li>
									)
								})}
							</ul>
						: ''}

					</div>
				</div>


			{(this.state.loading === false) ?
				<div>
					{this.state.entries.map((item, index) => {
						return(
							<div key={`ad-${index}`} className={"comparison-content stackelem-1024 grey1 flex " + ((this.state.activeIndex === index) ? " " : "is-hidden ")}>
								<div className="grid1of3 grey1 inner_4 block">
									<h3 className="fontSize3 colorBrandSecondaryAlt">{item.title}</h3>
									<Fragment>
									<p className="fontSize0" dangerouslySetInnerHTML={{__html: item.description.content}}></p>
									</Fragment>

								</div>

								<div className="grid1of3 grey1 inner_4 block">
									<h3 className="fontSize1 colorBrandSecondaryAlt">Product at-a-glance</h3>
					              	<div>

					                	{item.depositChecklist.map((item, index) => {
					                		return (
					                			<div key={`dcl-${index}`} className="flex at-a-glance mb-2">
						                			<span className="feather checklist inherit-lh fontSize1 colorBrandSecondary ml-0 mt-0"></span>
						                  			<span className="ml-3 colorGrey4">{item.rowText}</span>
						                  		</div>
					                		);
					                	})}

					              	</div>
								</div>
								<div className="grid1of3 grey2 inner_1 block">
									<table className="mt-2">
										<tbody>
											<tr className="grey2 pt-1">
												<td className="inner_2 pb-4">{item.rateTableTitles[0].table1stColumnTitle}</td>
											  	<td className="inner_2 pb-4">{item.rateTableTitles[0].table2ndColumnTitle}</td>
											  	<td className="inner_2 pb-4">{item.rateTableTitles[0].table3rdColumnTitle}</td>
											</tr>
											{item.rates.map((item, index) => {
												return(
													<tr key={`irates-${index}`} className="grey2 pt-1">
														<td className="">{item.table1stColumnValue}</td>
														<td className="">{item.table2ndColumnValue}</td>
														<td className="">{item.table3rdColumnValue}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									<div className="flex pt-0">
										<div className="grid1of2 gp-20 mt-1">
											<a href="/rates" className="colorBrandSecondaryAlt viewRates fontSize1">View Full Rates</a>
										</div>
										<div className="grid1of2 clearfix gp-20">
											<a className="button" href={this.props.applyLink} target="blank">
												Open Account
											</a>
										</div>
									</div>
								</div>
							</div>

						)
					})}
				</div>
			: ''}

			</div>


			<div className="hide-mobile">
			{
				(this.state.loading === false)
				? <Accordion data={this.state.entries} />
				: ""
			}

			</div>
        </div>
    );
  }
}


export default DepositComparison;
