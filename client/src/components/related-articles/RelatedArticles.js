import React, { Component } from 'react';
import { Switch, Route, matchPath } from "react-router-dom";
import axios from 'axios';
import ReactDOM from 'react-dom';




class RelatedArticles extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	relatedArticlesData: [
	    		{
	    			data1:{descCopy: "Random epsum ipsum la la la bacon sandwhich terrific!", image: "puppies1.jpg"},
	    			data2:{descCopy: "Random epsum ipsum la la la bacon sandwhich terrific!", image: "puppies1.jpg"},
	    			data3:{descCopy: "Random epsum ipsum la la la bacon sandwhich terrific! Random epsum ipsum la la la bacon sandwhich terrific!", image: "puppies1.jpg"}
	    		}
				]
	    }
	};

componentDidUpdate(prevProps, prevState) {

}

componentWillMount(){


}



  render() {


    return (
        <div className="flex grey2 related-articles">
					<div className="grid pt-4 pb-4 text-center">
					{this.state.relatedArticlesData.map((item, index) => {
							return(
								<div className="flex flex-wrap">
									<div className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">
										<div className="related-img" style={{backgroundImage: 'url('+`${process.env.REACT_APP_S3_URL}` + item.data1.image +')'}}></div>
										<p className="pt-1 pb-1 mr-1 ml-1">{item.data1.descCopy}</p>
									</div>
									<div className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">
										<div className="related-img" style={{backgroundImage: 'url('+`${process.env.REACT_APP_S3_URL}` + item.data2.image +')'}}></div>
										<p className="pt-1 pb-1 mr-1 ml-1">{item.data2.descCopy}</p>
									</div>
									<div className="grid1of3 pb-2 rel-article-card bg-white borderradius--large">
										<div className="related-img" style={{backgroundImage: 'url('+`${process.env.REACT_APP_S3_URL}` + item.data1.image +')'}}></div>
										<p className="pt-1 pb-1 mr-1 ml-1">{item.data3.descCopy}</p>
									</div>
								</div>
								)
						})}
					</div>
        </div>
    );
  }
}


export default RelatedArticles;
