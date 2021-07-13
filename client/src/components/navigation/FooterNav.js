import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import mixpanel from 'mixpanel-browser';


class FooterNav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			clickedChat: false,
		}

		this.clickedChat = this.clickedChat.bind(this);
		this.clickedCall = this.clickedCall.bind(this);
		this.trackLink = this.trackLink.bind(this);
		this.offsiteClick = this.offsiteClick.bind(this);
	}

	clickedChat(){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Live Chat - Footer', {

		});

		if (this.state.clickedChat === false) {
			this.setState({clickedChat:true});
		}

	}

	clickedCall(){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Click to Call - Footer', {});
	}

	trackLink(linkURL, linkTitle){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Footer Link Clicked', {
			linksTo: linkURL,
			linkTitle: linkTitle
		});
	}


	offsiteClick = (e) =>{
		e.preventDefault();

	}



  	render() {
	  	const data = this.props.data;
	  	const subData = this.props.subData;
	  	const footerDisclosures = this.props.footerDisclosures
	  	const Fragment = React.Fragment;

	    return (
	    	<footer className="clearfix ">
			    {/*<div className="footer-top-bar block full-width">
			    	<div className="container inner_2 block clearfix">
				    	<span className="footer-top-item pr-2">800.678.1234</span>
				    	<span className="footer-top-item pr-2">contact@solaritycu.org</span>
				    	<span className="footer-top-item pr-2">Routing Number</span>
				    	<span className="footer-top-item-last pr-2">INSERT SOCIAL ICONS</span>
				    </div>
			    </div>*/}






			    <div className="footer-main-bar bg-white full-width">
{/*}
						<div className="chat-loader">
							<span className="fontSize1"> Loading </span>
							<div className="chat-loader-gif" style={{backgroundImage: 'url(img/chat-loader.gif)'}}></div>
						</div>
{*/}
			    	<div className="footer-outer block clearfix">
			    		{(this.props.loading === false) ?
							<div className="footer-nav bg-white pull-left ">
					    		{data.map((d,i)=>{
					    			return(
					    				<ul key={'footer-section'+i} className="footer-link-list mb-2 mt-0">
						    				<li  className="link-list-heading mb-1 ">{d.label}</li>
						    				{d.list.list.map((list,index)=>{
						    					return(
						    						<li key={'footer-item'+index} className="link-list-item pb-1 ">
						    							<Link to={`/${list.link}`} className="link-hover colorGrey4 fontSize0" onClick={() => this.trackLink(list.link, list.title)}>{list.title}</Link>
						    						</li>
						    					);

						    				})}
					    				</ul>
					    			);
					    		})}
									<div className="footer-bottom-bar mt-2 clearfix">
						    		{(this.props.loading === false) ?
								    	subData.map((d,i)=>{
							    			return(
							    				<Link key={'sub'+i} to={`/${d.uri}`} onClick={() => this.trackLink(d.uri, d.title)} className="footer-bottom-item pt-1 pb-1 colorBrandSecondary link-hover">{d.title}</Link>
							    			);
							    		})
							    	: ""
							    	}
							    </div>
					    	</div>
					    : ''}

				    	<div className="footer-right-box bg-white pull-right ">
				    		<p className="mt-0 fontSize0 bold ">Need Support?</p>
				    		<p className="colorGrey4 mb-0">Monday - Thursday 8 am to 5:30 pm</p>
							<p className="colorGrey4 pb-0 mb-0 mt-0">Friday 8 am to 6 pm </p>
							<p className="colorGrey4 pb-2 mt-0">Saturday 9 am to 2 pm </p>
				    		<div className="right-box-icons">
									<div className="right-box-icon mb-half1">
										<a href="tel:800.347.9222" className="flex colorGrey4" onClick={this.clickedCall}>
											<span className="feather icon-phone-call pr-1"></span>
											<label className="colorGrey4">800.347.9222</label>
										</a>
									</div>
				    			<div className="right-box-icon mb-half1 ">
				    				<a href="mailto:contact@solaritycu.org?subject=Non-secure message to Solarity&body=This e-mail is not a secure method of communication. Please do not include any personal or sensitive information in this communication." className="flex colorGrey4">
					    				<span className="feather icon-mail pr-1"></span>
					    				<label className="colorGrey4">contact@solaritycu.org</label>
					    			</a>
				    			</div>
				    			<div className="right-box-icon mb-half1" >
{/*
				    				<span className="flex colorGrey4 chat-trigger" onClick={this.clickedChat}>
				    					<span className="feather icon-message-circle pr-1"></span>
				    					<label className="colorGrey4">Start Chat</label>
				    				</span>*/}

				    			</div>

				    		</div>
				    		<p className="mt-0 fontSize0 bold mt-4 ">Mailing Address</p>
							<p className="fontSize0 colorGrey4 "> Solarity Credit Union, P.O. Box 2922, Yakima, WA 98907-2922 </p>

				    	</div>


				    </div>
			    </div>

			    <div className="footer-site-bar inner_2 clearfix">
			    	<div className="container flex clearfix">
				    	{(this.props.loading === false) ?
				    		<Fragment>
				    		<Helmet>
					          <script type='text/javascript'>
					          {`
					            //console.log('%c testing log in script tag', 'background: #222; color: #bada55');
					            //console.log('%c testing another log...', 'background: #222; color: #bada55');
											//deployment test change

					            function regClick(){
					              //console.log('register a click');
					              $('.manual-modal-click').remove();
					            }

					            $('.offsite-link-inline').on('click', function(event){
					              event.preventDefault();
					              //console.log('default prevented');
					              //console.log('logging click');
					              //console.log($(this).attr('href'));
					              var link = $(this).attr('href');

					              $('body').append('<div class="manual-modal-click" style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"><div class="" aria-label="Offsite Speedbump modal" style="position: absolute; top: 50%; left: 50%; right: auto; bottom: auto; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px; margin-right: -50%; transform: translate(-50%, -50%);"><div class="this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center"><div class="fontSize1 fontMedium">External Link Disclaimer</div><div class="pb-2 fontSize0">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity’s privacy policy does not apply to linked websites.</div><button onClick="regClick()" class="button ml-2">Go Back</button><a href="' + $(this).attr('href') + '" class="button button-primary ml-2">Continue</a></div></div></div>');

					            });

					          `}
					          </script>
					        </Helmet>
					    		<div className="mr-2 clearfix" dangerouslySetInnerHTML={{__html: footerDisclosures}}></div>
					    		<div className="equal-opp">
						    		<a href="https://www.nar.realtor/fair-housing/fair-housing-program/what-everyone-should-know-about-equal-opportunity-housing" target="_blank" rel="noopener noreferrer" className="eho-logo pull-right offsite-link-inline" onClick={e => this.offsiteClick(e)}>
						    			<img src="https://s3-us-west-2.amazonaws.com/solarity-website-20180924123425848200000001/img/eho.png" alt="eho logo"/>
						    		</a>
						    	</div>
					    	</Fragment>
				    	: ""
				    	}
			    	</div>
			    </div>
		    </footer>

	    );
  	}
}


export default FooterNav;
