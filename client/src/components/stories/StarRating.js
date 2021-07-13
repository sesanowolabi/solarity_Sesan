import React, { Component } from 'react';
import mixpanel from 'mixpanel-browser';


class StarRating extends Component {
  constructor(props) {
      super(props);
      this.state = {
        submitted: false
      }
      this.hoverRating = this.hoverRating.bind(this);
      this.clearRating = this.clearRating.bind(this);
      this.submitRating = this.submitRating.bind(this);
  };

  componentWillMount(){
    let previouslyRated = localStorage.getItem(window.location.pathname);
    console.log("previouslyRated == " + previouslyRated)
    if(previouslyRated != null){
      this.setState({
        rating: previouslyRated,
        submitted: true
      })
    }  
  }

  hoverRating(value){
    this.setState({rating: value})
  }

  clearRating() {
    this.setState({rating: 0}) 
  }

  submitRating(value){
    console.log('DONE @' + value)
    let currentPath = window.location.pathname;
    let rating = this.state.rating;
    localStorage.setItem(currentPath, rating);
    this.setState({
      submitted: true,
      rating: value
    });
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');
    mixpanel.track('Blog Rated', {
      rating: value,
      page: currentPath
    });
  }

  render() {
    const ratings =[
      {rating: 1},
      {rating: 2},
      {rating: 3},
      {rating: 4},
      {rating: 5},
    ]
    return (
        <div className="container-sm mb-8">
          <h3 className="fontSize2 fontMedium full-width text-center">Rate this post</h3>
          <ul className="star-rating block text-center ml-0 pl-0">
            {(this.state.submitted === false) ? 
              <div>
                {ratings.map((d, i) => {
                  return(
                    <li className="rating inline-block" 
                      onMouseEnter={() => this.hoverRating(d.rating)} 
                      onMouseLeave={() => this.clearRating(d.rating)}
                      onClick={() => this.submitRating(d.rating)} 
                      key={i}
                      >
                      <svg width="32" height="32" viewBox="0 0 24 24">
                        <polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill={(this.state.rating >= d.rating) ? '#fac202' : '#666666'}/>
                      </svg>
                    </li>
                  )
                })}
              </div>
            : 
              <div>
                {ratings.map((d, i) => {
                  return(
                    <li className="rating inline-block" 
                      key={i}
                      >
                      <svg width="32" height="32" viewBox="0 0 24 24">
                        <polygon points="12 1.489 15.09 7.751 22 8.755 17 13.629 18.18 20.511 12 17.261 5.82 20.511 7 13.629 2 8.755 8.91 7.751 12 1.489" fill={(this.state.rating >= d.rating) ? '#fac202' : '#666666'}/>
                      </svg>
                    </li>
                  )
                })}

                <p className="fontSize1 fontRegular full-width text-center">Thanks for your feedback!</p>
              </div>
            }
            

            
          </ul>
        </div>
    );
  }
}


export default StarRating;
