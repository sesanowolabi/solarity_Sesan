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

  render() {
    const props = this.props.props;
    return (
      <li className="accordion--item">
        <button className="accordion--button fontSize3 fontBold no-underline " onClick={this.toggleItem} aria-expanded={this.state.expanded}>{(this.state.expanded === true) ? <span className="feather icon-chevron-down"></span> : <span className="feather icon-chevron-right"></span>} {props.heading} </button>
        <Fragment>
          <div dangerouslySetInnerHTML={{__html: props.description.content}} className={"accordion--content pl-4 fontSize0 fontRegular richText " + ((this.state.expanded === true) ? 'is-visible' : 'is-hidden')} aria-hidden={this.state.contentVisible}>
          </div>
        </Fragment>

      </li>
    );
  }

};

// GuestName.propTypes = {
//   isEditing: PropTypes.bool.isRequired,
//   handleNameEdits: PropTypes.func.isRequired
// };

export default AccordionItem;
