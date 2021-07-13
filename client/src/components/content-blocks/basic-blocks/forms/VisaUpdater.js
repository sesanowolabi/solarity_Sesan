import React from 'react';
import {Helmet} from "react-helmet";

const VisaUpdater = props => {
  const data = props.data;
  console.log(data);
  return (
    <section className="full-width stripe_6 "> 
      <Helmet>
      
  		<script>
  		{`
			var loadScriptAsync = function(uri){
			  return new Promise((resolve, reject) => {
			    var tag = document.createElement('script');
			    tag.src = uri;
			    tag.async = true;
			    tag.onload = () => {
			      resolve();
			    };
			  var firstScriptTag = document.getElementsByTagName('script')[0];
			  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			});
			}
			var scriptLoaded = loadScriptAsync('//app-sj15.marketo.com/js/forms2/js/forms2.min.js?ver=1.0.0');
		`}
		</script>
		<script>
		{`
			scriptLoaded.then(function(){
			  MktoForms2.loadForm("//app-sj15.marketo.com", "241-NMD-150", 1342);
			});
		`}
		</script>
      </Helmet>

        <form className="align-center" id="mktoForm_1342"></form>


    </section>
  );
};

export default VisaUpdater;