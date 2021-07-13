import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import SiteSearch from './../SiteSearch';
import Login from './Login';

import PropTypes from 'prop-types';

import mixpanel from 'mixpanel-browser';

class PrimaryNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: '',
      mobileMenu: '',
      search: '',
      login: 'is-hidden'
    }

    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);


    this.offNavClick = this.offNavClick.bind(this);
    this.toggleMobileNavClick = this.toggleMobileNavClick.bind(this);
    this.closeLogin = this.closeLogin.bind(this);

    this.focusLink = this.focusLink.bind(this);
    this.focusLogin = this.focusLogin.bind(this);
    this.focusMainLink = this.focusMainLink.bind(this);

    this.trackLink = this.trackLink.bind(this);
  }

  componentDidMount(){
  	// console.log('in nav');
  	console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState){
  	if (this.props.location.pathname !== prevProps.location.pathname && this.state.search === 'is-visible') {
  		this.setState({search:''});
  	}
  	if (this.props.location.pathname !== prevProps.location.pathname && this.state.login === 'is-visible') {
  		this.setState({login:'is-hidden'});
  	}
  }

  focusLink(){
  	console.log('link focused...');
  	if (this.state.mobileMenu === '') {
  		this.setState({
  			mobileMenu: 'is-visible'
  		})
  	}
  }

  focusMainLink(){
  	console.log('focus main link');
  	if (this.state.mobileMenu === 'is-visible') {
  		this.setState({
  			mobileMenu: ''
  		})
  	}

  }

  focusLogin(){
  	console.log('login focused');
  	if (this.state.mobileMenu === 'is-visible') {
  		this.setState({
  			mobileMenu: ''
  		})
  	}
  }



  offNavClick(){
  	this.setState({mobileMenu: ''});
  }

	toggleMobileNav(){
	  	if(this.state.mobileMenu === 'is-visible') {
	  		this.setState({mobileMenu: ''});
	  	} else {
	  		this.setState({mobileMenu: 'is-visible'});
	  	}
	}

	toggleMobileNavClick(){
	  	if(this.state.mobileMenu === 'is-visible') {
	  		this.setState({mobileMenu: ''});
	  	}
	}


	toggleSearch(){
	  	if(this.state.search === 'is-visible') {
  			this.setState({search: ''});
	  	} else {
	  		this.setState({search: 'is-visible'});
	  	}
	}

	toggleLogin(){
	  	if(this.state.login === 'is-visible') {
  		    this.setState({login: 'is-hidden'});
	  	} else {
	  		this.setState({login: 'is-visible'});
	  	}
	}

	closeLogin(){
		if(this.state.login === 'is-visible') {
  		    this.setState({login: 'is-hidden'});
	  	}
	}

  trackLink(linkURL, linkTitle){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Primary Nav Clicked', {
      linksTo: linkURL,
      linkTitle: linkTitle
    });
    if(this.state.mobileMenu === 'is-visible') {
      this.setState({mobileMenu: ''});
    }
  }

  render() {

  	const data = this.props.data;
  	//const url = `${process.env.REACT_APP_BASE_URL}`;


  	let bumpDown = false;
    //let notificationIndex = 0;


    if(this.props.notifications.length > 0){
      // console.log('we have notifications');
      for(let i = 0; i < this.props.notifications.length; i++){
        // console.log(`notification number ${i}`)
        if(this.props.notifications[i].pagesToDisplayOn.length > 0){
          // console.log('we have pages to display on');
          for(let x = 0; x < this.props.notifications[i].pagesToDisplayOn.length; x++){
            if (('/' + this.props.notifications[i].pagesToDisplayOn[x].uri) === this.props.location.pathname && this.props.dismissed[i] !== true) {
                bumpDown = true;
                //notificationIndex = i;

            }
            if(this.props.notifications[i].pagesToDisplayOn[x].uri === '__home__' && this.props.location.pathname === '/' && this.props.dismissed[i] !== true){
							bumpDown = true;
						}
						if(this.props.dismissed[i] == true) {
							bumpDown = false;
						}
          }
        }
        else if(this.props.notifications[i].pagesToDisplayOn.length === 0 && this.props.dismissed[i] !== true){
          bumpDown = true;
          //notificationIndex = i;
        }

      }
    }



    return (
    <div id="navigation" className={(bumpDown) ? "bump-header-down" : " " } role="region" aria-labelledby="navigation">
    	<header className={(bumpDown) ? "bump-header-down clearfix" : "clearfix" } onClick={() => this.closeLogin()}>

    		<NavLink className="inline-block pull-left" onFocus={this.focusMainLink} to="/" onClick={() => this.trackLink('/', 'home page')}>


    			<img className="logo" src="/img/logo.svg" alt="Solarity Credit Union"/>


    		</NavLink>

    		{(this.state.search === 'is-visible') ?
    			<div id="search" role="search" className={"search clearfix " + this.state.search}>

    			</div>
    			: ''
    		}



			{(this.props.loading === false && this.state.search !== 'is-visible') ?
			<div>
				<div className="clearfix">
					<nav className={"clearfix " + this.state.mobileMenu}>
						<ul>
				    		{data.map((d, i) => {
				    		return (
				          <li key={i}>
  									<NavLink className="has-subnav fontSize0" to={'/' + d.labelLink.labelL[0].link} onClick={() => this.trackLink(d.labelLink.labelL[0].link, d.label)}>{d.label}</NavLink>
  									<div className="subnav-block">
  										<ul>
  											{d.list.list.map((list, index) => {
  												return (
  													<li key={index}>
  														<NavLink className="link-hover" onFocus={this.focusLink} to={`/${list.link}`} onClick={() => this.trackLink(list.link, list.title)}>{list.title}</NavLink>
  													</li>
  												)
  											})}
  										</ul>
  									</div>
								  </li>
							);
				        })}
				        </ul>

				    </nav>
				    {(this.state.search !== 'is-visible') ?
						<div>
						    <div className="controls-container">
						        <button className={"button button-primary login pull-left fontSize0 " + this.state.login} onClick={this.toggleLogin} onFocus={this.focusLogin}>Login</button>
						        <div className="hamburger-container clearfix pull-right">
					    			<div className={"hamburger clearfix " + this.state.mobileMenu} onClick={this.toggleMobileNav}>
						    			<span></span>
						    			<span></span>
						    			<span></span>
						    			<span></span>
					    			</div>
					    		</div>
					    		<div className="icons pull-right pl-2 ">
							        <NavLink to="/locations" onClick={() => this.trackLink('/locations', 'Locations - Nav Icon')}>
							        	<div className="icon feather icon-map-pin"></div>
							        </NavLink>
							        <div className="search-trigger" onClick={this.toggleSearch}>
							        	<div className="icon feather icon-search"></div>
							        </div>
							    </div>
						    </div>
						</div>
		    			: ''
		    		}
			    </div>
			    <div onClick={() => this.offNavClick()} className={"mobile-nav-click-helper " + this.state.mobileMenu }></div>

		    </div>
			    : ''}



	    </header>
	    <div className={"search clearfix " + this.state.search}>
	    	{/*<button className="feather icon-search pull-left"></button>*/}
      {
        (this.state.search === 'is-visible')
        ? <SiteSearch toggle={this.toggleSearch}/>
        : ''
      }

			<button className="close-search feather icon-x pull-right" onClick={this.toggleSearch}></button>
			<div className="search--overlay" onClick={this.toggleSearch}></div>
	    </div>
	    {(this.state.login === 'is-visible') ?
	    	<Login visible={this.state.login} toggleLogin={this.toggleLogin}/>
	    : ''}
	</div>

    );
  }


  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
}


export default withRouter(PrimaryNav);
