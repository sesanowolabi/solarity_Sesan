import React, { Component } from 'react';
import {Helmet} from "react-helmet";

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

    console.log('logging data!!!!!!!!')
    console.log(this.props.data)
    if (this.props.data === undefined) {
      return("");
    }
    return (
      <li className="accordion--item">
        <Helmet>
          <script type='text/javascript'>
          {`
            //console.log('%c testing log in script tag', 'background: #222; color: #bada55');
            //console.log('%c testing another log...', 'background: #222; color: #bada55');

            function regClick(){
              //console.log('register a click');
              $('.manual-modal-click').remove();
            }

            $('.offsite-link-inline').on('click', function(event){
              event.preventDefault();
              //console.log('default prevented');
              //console.log('logging click');
              //console.log($(this).attr('href'));
              var link = $(this).attr('href');

              $('body').append('<div class="manual-modal-click" style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"><div class="" aria-label="Offsite Speedbump modal" style="position: absolute; top: 50%; left: 50%; right: auto; bottom: auto; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px; margin-right: -50%; transform: translate(-50%, -50%);"><div class="this-will-be-outer-modal-holder speedbump-modal-outer align-center text-center"><div class="fontSize1 fontMedium">External Link Disclaimer</div><div class="pb-2 fontSize0">Solarity Credit Union has no control over information at any site hyperlinked to or from this Site. Solarity Credit Union makes no representation concerning and is not responsible for the quality, content, nature, or reliability of any hyperlinked site and is providing this hyperlink to you only as a convenience. The inclusion of any hyperlink does not imply any endorsement, investigation, verification or monitoring by Solarity Credit Union of any information in any hyperlinked site. In no event shall Solarity Credit Union be responsible for your use of a hyperlinked site. Solarity’s privacy policy does not apply to linked websites.</div><button onClick="regClick()" class="button ml-2">Go Back</button><a href="' + $(this).attr('href') + '" class="button button-primary ml-2">Continue</a></div></div></div>');

            });

          `}
          </script>
        </Helmet>

        <button 
          className="accordion--button fontSize3 fontBold" 
          onClick={this.toggleItem} 
          aria-expanded={this.state.expanded}>{(this.state.expanded === true) ? <span className="feather icon-chevron-down"></span> : <span className="feather icon-chevron-right"></span>} {this.props.data.heading}
        </button>
        <Fragment>  

          {
            (this.props.data.description)
            ? <div dangerouslySetInnerHTML={{__html: this.props.data.description.content}} className={"accordion--content pl-4 fontSize0 fontRegular richText " + ((this.state.expanded === true) ? 'is-visible' : 'is-hidden')} aria-hidden={this.state.contentVisible}></div>

            : ''
          }

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
