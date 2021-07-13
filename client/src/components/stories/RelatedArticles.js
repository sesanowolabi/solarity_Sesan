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
				<div className="grey2 pt-2">

					<h3 className="fontSize2 fontMedium full-width text-center mb-0 "> You might also like...</h3>
	        <div className="flex related-articles">
	        	{(this.props.data.length !== 0) ?
	        		<div className="grid pb-4 text-center">
						<div className="flex flex-wrap">
							{this.props.data.map((item, index) => {
								return(
									<Link to={`/${item.uri}`} key={index} className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">
										<div className="related-img" style={{backgroundImage: `url('${process.env.REACT_APP_S3_URL}${item.hero[0].image[0].filename}')`}}></div>
										<p className="pt-1 pb-1 pr-1 pl-1 fontSize2">{item.title}</p>
									</Link>
								)
							})}
						</div>
					</div>
					: ''
	        	}

	        </div>
	        </div>
	    );
  	}
}


export default RelatedArticles;
