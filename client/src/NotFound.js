import React from 'react';
import { NavLink} from 'react-router-dom';



const NotFound = () => (

  <div className="main-content not-found offsetNav stripe_6">
    <div className="full-height distribute distribute-vertical distribute-center">
    	<div className="flex-item full-width p20">
    		<h2 className="text-center fontSize5" >404 Page Not Found</h2>
				<img className="puppies" src="/img/Puppies1.jpg" alt="not found"/>
				<p className="text-center fontBold colorBrandSecondary fontSize4 notFoundSubCopy mb-4"> Bad news, this page is unavailable. Good news, here are some puppies!</p>
        <div className="text-center full-width">
				  <NavLink className="button button-alt fontSize2 notFoundButtonOverride" to={`/`}> Home </NavLink>
        </div>
    	</div>
    </div>
  </div>
);

export default NotFound;
