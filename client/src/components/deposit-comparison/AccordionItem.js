import React, { Component } from 'react';

const Fragment = React.Fragment;

class AccordionItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
        expanded: false,
        contentIsHidden: true
      }
      this.toggleItem = this.toggleItem.bind(this);
  };

  componentDidMount(){
    // //console.log(this.props)
    console.log(this.props);
  }

  toggleItem(){
    if(this.state.expanded === true) {
      this.setState({
        expanded: false,
        contentIsHidden: true
      });
    } else {
      this.setState({
        expanded: true,
        contentIsHidden: false
      });
    }

  }

  render(){
    return(
        <li className="accordion--item">
          <button className="accordion--button fontSize3 colorBrandPrimary fontBold mb-0 pb-3 pt-3" onClick={this.toggleItem} aria-expanded={this.state.expanded}>{(this.state.expanded === true) ? <span className="feather icon-chevron-down"></span> : <span className="feather icon-chevron-right"></span>} {this.props.data.title} </button>
          <div  className={"accordion--content grey1 inner_4 borderradius--large pl-4 mb-1 fontSize0 fontRegular " + ((this.state.expanded === true) ? 'is-visible' : 'is-hidden')} aria-hidden={this.state.contentVisible}>
          <Fragment>
          <div className="fontSize2 colorGrey5 fontBold mt-0 mb-2" dangerouslySetInnerHTML={{__html: this.props.data.description.content}}></div>
          </Fragment>
          <div className="fontSize1 colorBrandSecondary fontBold">{this.props.data.heading}</div>
          {this.props.data.depositChecklist.map((item, index) => {
            return(
              <div key={`rd-${index}`}>
                <div className="flex at-a-glance mb-1">
                  <span className="feather checklist fontSize1 colorBrandSecondary ml-0 mt-0">
                  </span>
                  <span className="ml-3 colorGrey4">{item.rowText}
                  </span>
                </div>
              </div>
            )
          })}
          <div className="colorBrandPrimary">
                <div>
                  <table className="borderradius--large mt-2 bg-white">
                  <tbody>
          					<tr className="colorBrandSecondary pt-1">
          						<td className="inner_2 pb-4">Dividend Rate</td>
          					  <td className="inner_2 pb-4">Annual Percentage Yeild</td>
          					  <td className="inner_2 pb-4">Minimum Balance to Earn APY</td>
          					</tr>
                    {this.props.data.rates.map((item, index) => {
                      return(
          						<tr key={`ai-${index}`} className="colorGrey4 pt-1">
          							<td>{item.table1stColumnValue}</td>
          							<td>{item.table2ndColumnValue}</td>
          							<td>{item.table3rdColumnValue}</td>
          						</tr>
                      )
                    })}
                  </tbody>
          				</table>
                  <div className="spacers-horizonal pt-0">
                    <div className="grid1of2 pl-1 mt-2">
                      <a href="#" className="colorBrandSecondaryAlt viewRates fontSize1">View Full Rates</a>
                    </div>
                    <div className="grid1of2 text-center">
                      <a className="button button-primary link--white fontSize1 pt-1 pb-1 pr-4 pl-4 mt-2">
                        Open Account
                      </a>
                    </div>
                  </div>
                </div>
          </div>
          </div>
        </li>
      );
  }

  // render() {
  //   const props = this.props.props;
  //   return (
  //     <li className="accordion--item">
  //       <button className="accordion--button fontSize3 fontBold" onClick={this.toggleItem} aria-expanded={this.state.expanded}>{(this.state.expanded == true) ? <span className="feather icon-chevron-down"></span> : <span className="feather icon-chevron-right"></span>} {props.heading} </button>
  //       <Fragment>
  //         <div dangerouslySetInnerHTML={{__html: props.description}} className={"accordion--content pl-4 fontSize0 fontRegular richText " + ((this.state.expanded == true) ? 'is-visible' : 'is-hidden')} aria-hidden={this.state.contentVisible}>
  //         </div>
  //       </Fragment>

  //     </li>
  //   );
  // }

};

// GuestName.propTypes = {
//   isEditing: PropTypes.bool.isRequired,
//   handleNameEdits: PropTypes.func.isRequired
// };

export default AccordionItem;
