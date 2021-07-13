import React, { Component } from 'react';
import { Link } from "react-router-dom";





class RelatedArticles extends Component {
	constructor(props) {
	    super(props);
	    this.state = {

	    }
	};

  	render() {
	    return (
	        <div className="flex grey2 related-articles">
	        	{(this.props.data.length !== 0) ? 
	        		<div className="grid pt-4 pb-4 text-center">
						<div className="flex flex-wrap">
							<h2 className="fontSize4 colorBrandSecondary block full-width text-left mb-0">Featured FAQs</h2>
							{this.props.data.map((item, index) => {
								return(
									<Link to={`/${item.uri}`} key={index} className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">
										<div className="related-img" style={{backgroundImage: `url('${process.env.REACT_APP_S3_URL}${item.image[0].filename}')`}}></div>
										<p className="pt-1 pb-1 pr-1 pl-1 fontSize2">{item.title}</p>
									</Link>
								)
							})}
						</div>
					</div>
					: ''	
	        	}
				
	        </div>
	    );
  	}
}


export default RelatedArticles;
