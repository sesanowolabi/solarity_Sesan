import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { 
	InstantSearch, 
	SearchBox, 
	Hits,
} from 'react-instantsearch-dom';

const Hit = ({hit}) => 
	<div onClick={e => {
        // //console.log(hit);
        
      }}>
      <Link to={`/${hit.uri}`}>{hit.title}</Link>		
  	</div>  

const SearchResults = () => 
	<div>
	 <Hits hitComponent={Hit}/>
	</div>

class FaqSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      view: 'hide',
      inputValue: '',
    }

    this.getClick = this.getClick.bind(this);
  }

  getClick(e){
  	// //console.log(e);
    if (this.state.view === 'hide') {
      this.setState({
        view: 'show',
      });
    }
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  
  render() {  

    return (
      <div>
        <InstantSearch
  		    appId="2SREYCF5I4"
  		    apiKey="6238455a9fcb7cf5fc9ff4469f86ad95"
  		    indexName={`faqs-${process.env.REACT_APP_ALGOLIA_SITE}`}>
		  	<SearchBox onChange={evt => this.updateInputValue(evt)} translations={{placeholder: 'Search frequently asked questions'}}/>

		  	{
          (this.state.inputValue !== '') ? <SearchResults /> : ''

        }
		    </InstantSearch>
      </div>
    );
  }
}


export default FaqSearch;
