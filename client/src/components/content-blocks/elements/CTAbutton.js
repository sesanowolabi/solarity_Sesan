import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import OffsiteLink from '../../helpers/OffsiteLink';

class CTAbutton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
		}

		this.openModal = this.openModal.bind(this);
		this.trackLink = this.trackLink.bind(this);
	}

	openModal(){
		this.setState({
			modalIsOpen: true,
		})
	}

	closeModal = () => {
		this.setState({
			modalIsOpen: false,
		});
	}

	trackLink(buttonName, linkPath){
		mixpanel.init('d96d9f1409ced72777048f912ef7591e');
		mixpanel.track('CTA Link', {
			buttonText: buttonName,
			buttonLink: linkPath,
		});
	}



render(){
  const data = this.props.data;
  console.log(data);

  return (
    <div>
	   	{(data.linksToOnsite.length > 0) 
	   		? <Link className="button button-primary" to={`/${data.linksToOnsite[0].uri}`} onClick={() => this.trackLink(data.linksToOnsite[0].uri, data.buttonText)}>{data.buttonText}</Link>
	   		: ''
	   	}

	   	{
	   		(data.linksToOffsite !== '' && data.linksToOnsite.length < 1) ? 
	   			<div>
	   				{/* <a className="button button-primary" href={data.linksToOffsite}>{data.buttonText}</a> */}

	   				<OffsiteLink 
	   					link={data.linksToOffsite} 
	   					buttonText={data.buttonText}
	   					button={true}
	   					>
	   				</OffsiteLink>
	   			</div>
	   		: ''
	   	}
	</div>
  );

}  

}


export default CTAbutton;


// {
// 	   		(data.linksToOffsite !== '' && data.linksToOnsite.length < 1) ? 
// 	   			<div>
// 	   			<OffsiteSpeedBump modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} offsiteLink={data.linksToOffsite} buttonText={data.buttonText} ></OffsiteSpeedBump>
// 	   			<button className="button button-primary fontSize0" onClick={()=>this.openModal()}>{data.buttonText}</button>
// 	   			</div>
// 	   		: ''
// 	   	}