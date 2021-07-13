import React, { Component } from 'react';

import {Helmet} from "react-helmet";
import mixpanel from 'mixpanel-browser';

class LandingNav extends Component {
  constructor(props) {
    super(props);
    this.scrollTo = this.scrollTo.bind(this);
  }


  componentDidMount(){
    mixpanel.init('d96d9f1409ced72777048f912ef7591e');

    console.log(this.props)
  }

  scrollTo(){
    const formData = {
     "utm_content": this.props.queryString,
    };

    mixpanel.track('Scroll To Get Started Button - LP', {
      usedCalculator: this.props.usedCalc,
      QueryString : formData['utm_content'],
    });

    this.props.handleClickScrollForm();

    console.log("SUCCESS")
  }


  render() {

    const data = this.props.data.landingPageNav;
    return (
    <div role="navigation">

    	<header className="landing-nav clearfix">
    		<div className="grid">
          <Helmet>
            <script type='text/javascript'>
            {`
              //console.log('preventing default script..');
              $('.landing-nav-home - LP').on('click', function(event){

                //console.log('test default prevented');
                //console.log('logging click');
                var link = $(this).attr('href');
                var text = $(this).text();

                mixpanel.track(
                    "Landing page home clicked - LP",
                    {
                      "link url": link,
                      "button text": text,
                      "usedCalculator": "${this.props.usedCalc}",
                    }
                );



              });

            `}
            </script>
          </Helmet>
    			<a className="landing-nav-home inline-block pull-left" target="_blank" href={`https://www.solaritycu.org/${this.props.queryString}`}>
	    			<img className="logo pt-2" src="/img/logo.svg" alt="Solarity Logo"/>
	    		</a>

          <a class="button button-primary inline-block mt-2 pull-right" href="#get-started-form" onClick={this.scrollTo}>Talk To An Expert</a>

          {(this.props.showHours) ?



	    		<div className="inline-block pull-right pt-2">
	    			<div>
              <Helmet>
                <script type='text/javascript'>
                {`
                  //console.log('preventing default script..');
                  $('.landing-nav-phone').on('click', function(event){
                    event.preventDefault();
                    //console.log('test default prevented');
                    //console.log('logging click');
                    var link = $(this).attr('href');
                    var text = $(this).text();

                    mixpanel.track(
                        "Landing page contact phone clicked - LP",
                        {
                          "link url": link,
                          "button text": text,
                          "usedCalculator": "${this.props.usedCalc}",
                        }
                    );
                    window.location = link;


                  });
                `}
                </script>
              </Helmet>
              <a className="colorBrandSecondary fontSize2 fontMedium pb-1 landing-nav-phone" href={"tel:"+data.outboundLink}>{data.outboundLink}</a>
            </div>
            <div className="pb-1 realtor-hours-override" dangerouslySetInnerHTML={{__html: data.description.content}}></div>
	    		</div>


          : ""
        }


    		</div>
	    </header>
	</div>

    );
  }
}


export default LandingNav;
