import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sitemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }  

  componentDidUpdate(nextProps, nextState){
    
  }

  componentWillMount(){

  }

  componentDidMount(){
   
    //console.log(this.props.data);
    

  }

  
  
  render() {  

    let stuff = this.props.data;
    

    return (
      <div className="offsetNav container--sm mb-6 flex flex-wrap">
        <h1 className="full-width">Sitemap</h1>
        {
          (stuff[0]) ? 
          stuff.map((d, index) => {
        
            return (
              <div className="ml-2 columnList2" key={'level1-' + index}>
                <Link to={d.sitemapEntriesConnection.entries[0].uri} className="link inline fontSize3 fontMedium">{d.sitemapEntriesConnection.entries[0].title} </Link>
                {
                  (d.hasDescendants) ?
                  d.children.map((d2, index2) => {
                    return (
                      <div className="ml-4" key={'level2-'+index2}>
                        <Link to={d2.sitemapEntriesConnection.entries[0].uri} className="link inline ">{d2.sitemapEntriesConnection.entries[0].title} </Link>
                        {
                          (d2.hasDescendants) ?
                          d2.children.map((d3, index3) => {
                            return (
                              <div className="ml-6" key={'level2-'+index3}>
                                <Link to={d3.sitemapEntriesConnection.entries[0].uri} className="link inline">{d3.sitemapEntriesConnection.entries[0].title} </Link>
                              </div>
                            );
                          })
                          : ""
                        }
                      
                      </div>
                    );
                  })
                  : ""
                }
              </div>
            );
          })
          : ""

        }
      </div>
    );
  }
}

export default Sitemap;
