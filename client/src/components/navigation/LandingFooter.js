import React, { Component } from 'react';


// import {Helmet} from "react-helmet";
import mixpanel from 'mixpanel-browser';

class FooterNav extends Component {

constructor(props) {
	super(props);
	this.state = {

	}
  this.footerClicks = this.footerClicks.bind(this);
}

  componentDidMount(){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
  }

  footerClicks(buttonName, outboundLink){
      mixpanel.init('d96d9f1409ced72777048f912ef7591e');
      mixpanel.track('Landing page footer link clicked - LP', {
        QueryString : this.props.queryString,
        buttonText: buttonName,
        buttonLink: outboundLink,
      });

  }

  render() {
  	// const data = this.props.data;
  	// const subData = this.props.subData;
  	const footerDisclosures = this.props.footerDisclosures
  	const Fragment = React.Fragment;
  	let qs = this.props.queryString;
  	let queryString1 = `https://www.solaritycu.org/disclosures/${qs}`;
  	let queryString2 = `https://www.solaritycu.org/disclosures/avoid-foreclosure/${qs}`;
  	let queryString3 = `https://www.solaritycu.org/articles/${qs}`;
  	let queryString4 = `https://www.solaritycu.org/contact/${qs}`;

    return (
    	<footer className="clearfix">
		    <div className="container clearfix">
		    	<div className="footer-bottom-bar stripe_2 clearfix">
			    	<a onClick={() => this.footerClicks('Disclosures', "https://www.solaritycu.org/disclosures")} className="landing-nav-footer" href={`${queryString1}`} className="footer-bottom-item pt-1 pb-1 link-hover">Disclosures</a>
			    	<a onClick={() => this.footerClicks('Avoid Foreclosure', "https://www.solaritycu.org/disclosures/avoid-foreclosure")} className="landing-nav-footer" href={`${queryString2}`} className="footer-bottom-item pt-1 pb-1 mr-2 link-hover">Avoid Foreclosure</a>
			    	<a onClick={() => this.footerClicks('Blog', "https://www.solaritycu.org/articles")} className="landing-nav-footer" href={`${queryString3}`} className="footer-bottom-item pt-1 pb-1 mr-2 link-hover">Blog</a>
			    	<a onClick={() => this.footerClicks('Contact us', "https://www.solaritycu.org/contact")} className="landing-nav-footer" href={`${queryString4}`} className="footer-bottom-item pt-1 pb-1 mr-2 link-hover">Contact Us</a>
			    </div>
		    </div>
		    <div className="footer-site-bar inner_2 clearfix">
		    	<div className="container clearfix">
		    		<Fragment>
			    		<div className="grid3of4 richText clearfix" dangerouslySetInnerHTML={{__html: footerDisclosures}}></div>
			    		<div className="grid1of4">
				    		<a className="landing-nav-footer" href="https://www.hud.gov/program_offices/fair_housing_equal_opp" target="_blank" rel="noopener noreferrer" className="eho-logo pull-right">
				    			<img src="https://s3-us-west-2.amazonaws.com/solarity-website-20180924123425848200000001/img/eho.png" alt="Equal Housing Logo"/>
				    		</a>

				    	</div>
			    	</Fragment>
		    	</div>
		    </div>
	    </footer>

    );
  }
}


export default FooterNav;
