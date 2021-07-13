import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// apollo
import ApolloClient, { gql } from 'apollo-boost';

class FaqCategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      currentCount: 2,
      loading: true
    }
  }

  componentDidMount(){

    const CATEGORIES = gql`
      {
        entries(section:[faqs], relatedTo:[{element:${this.props.catId}}]){
          id
          title
          uri
        }
      }
    `;

    // Get the preview token from the URL
let m = document.location.href.match(/\btoken=([^&]+)/);
let token = m ? m[1] : '';
// Then forward that on whenever you are sending a CraftQL API request
let url = `graph-api?token=${token}`;
    const client = new ApolloClient({
      uri: `${process.env.REACT_APP_BASE_URL}${url}`,
      request: operation => {
        operation.setContext({
          headers: {
            Authorization: `bearer ${process.env.REACT_APP_GRAPH_TOKEN}`,
          },
        });
      },
    });

    client
      .query({
        query: CATEGORIES,
      })
      .then(response => {
        // //console.log(response.data.entries);

        this.setState({
          related: response.data.entries
        });
      });


  }


  render() {

    let title = this.props.title;
    let catUri = this.props.catUri;
    let related = this.state.related;
    let currentCount = this.state.currentCount;
    let image = this.props.image;

    return (
      <div className="faq-single-category">
        <img className="pb-2" alt="category" src={`${process.env.REACT_APP_S3_URL}` + image}/>

        <Link to={`/${catUri}`} className="fontSize3 fontMedium colorGrey5 block pb-1">{title}</Link>
        <ul>
          {related.map((d, index) => {
            return (
              <li key={index} className={'block  ' + ((currentCount >= index) ? '' : 'hide')}>
                <Link className="fontSize0 colorGrey4 " to={`/${d.uri}`}>{d.title}</Link>
              </li>
            )
          })}
        </ul>
        {related.length > 3 ? <span><Link className="colorBrandSecondary fontMedium pb-1 link-hover" to={`/${catUri}`}>View All ({related.length - 3} More) </Link></span> : ""}
      </div>
    );
  }



}
export default FaqCategoryItem;
