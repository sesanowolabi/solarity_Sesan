import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { 
	InstantSearch,  
	Hits,
  connectSearchBox
} from 'react-instantsearch-dom';



const SearchBoxs = ({ currentRefinement, isSearchStalled, refine }) => (
  <div>
    <div className="feather icon-search pull-left"></div>
    <input
      type="search"
      value={currentRefinement}
      placeholder="What are you looking for?"
      onChange={event => refine(event.currentTarget.value)}
      aria-label="searchbox"
      name="search input"
      role="searchbox"
    />

    
    {isSearchStalled ? 'My search is stalled' : ''}
  </div>
);

const CustomSearchBox = connectSearchBox(SearchBoxs);

const Hit = ({hit}) => 
	<div onClick={e => {}}>
      <Link to={`/${hit.uri}`}>{hit.title}</Link>
	</div>  

const SearchResults = () => 
	<div>
	 <Hits hitComponent={Hit}/>
	</div>

class SiteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      view: 'hide',
      inputValue: '',
    }

    // this.getClick = this.getClick.bind(this);
  }



  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
    console.log(SearchResults)
    console.log(Hits)
    console.log(Hit)
  }
  
  render() {  

    return (
      <div id="search" className="search--box" role="search" aria-labelledby="search">
        <InstantSearch
  		    appId="2SREYCF5I4"
  		    apiKey="6238455a9fcb7cf5fc9ff4469f86ad95"
  		    indexName={`site-${process.env.REACT_APP_ALGOLIA_SITE}`}

        >
		  	

        <CustomSearchBox />
        <SearchResults />

		    </InstantSearch>
      </div>
    );
  }
}


export default SiteSearch;
