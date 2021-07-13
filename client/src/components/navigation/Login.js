import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';

class Login extends Component {
  constructor(props) {
    	super(props);
	    this.state = {
	      activeItem: '',
	      userName: ''  
	    }
	    
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.updateUsername = this.updateUsername.bind(this);
  	}   

  	handleSubmit(){
  		console.log('handling submit, submiting to mixpanel');
  		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('Logged In', {});
  		// axios.post('https://my.solaritycu.org/UserLogin', this.state.userName).then(res => {
  		// 	console.log(res)
  			
	   //  })
	   //  .catch(error => {
	   //    console.log(error);
	   //  });

	   return true;
  	}

  	updateUsername(e){
  		this.setState({userName: e.target.value})
  		console.log(e.target.value);
  	}

  render() {
    return (
    	
		<div className={"login-form-container inner_2 " + this.props.visible} role="region">
			<div className="login-full-off-click" onClick={() => this.props.toggleLogin()}></div>
			<div className="orpheus-login" noValidate="">
			{/*
				<label className="pb-2">
					<div aria-label="Login ID fontMedium">Login ID</div>
					<input className="gtrackloginusername" autoCapitalize="off" autoComplete="off" type="text" tabIndex="0" onChange={this.updateUsername}/>
				</label>
				<a href="https://my.solaritycu.org/UserLogin" target="_blank"  className="gtrackloginsubmit button button-primary full-width fontSize0 mb-2 text-center" aria-label="Log in" tabIndex="0" onClick={this.handleSubmit}>Log in</a>
			*/}
			<form onSubmit={() => this.handleSubmit()} className="orpheus-login" action="https://my.solaritycu.org/UserLogin" method="post" target="_blank" rel="noopener noreferrer">
				<label className="pb-2">
					<div aria-label="Login ID fontMedium">Login ID</div>
					<input name="userName" className="gtrackloginusername" aria-label="user name" autoCapitalize="off" autoComplete="off" type="text" tabIndex="0" onChange={this.updateUsername}/>
				</label>
				<button type="submit" target="_blank" className="gtrackloginsubmit button button-primary full-width fontSize0 mb-2 text-center" aria-label="Log in" tabIndex="0" >Log in</button>
			</form>
			</div>
			<nav className="login-utility">
				<ul>
					<li className="inline-block">
						<a href="https://my.solaritycu.org/Retrieval/SelectUserKind/Password" tabIndex="0" className="gtrackexternal" target="_blank" rel="noopener noreferrer">Forgot Password?</a>
					</li>
					<li className="inline-block">
						<a href="https://www.solaritycu.org/contact" tabIndex="0">Need Help?</a>
					</li>
				</ul>
			</nav>
		</div>
		
		
    );
  }
}


export default Login;
