import React from 'react';

const PageRevealLoader = props => {

  return (
    <div className="offsetNav full-height full-width page-reveal-loader">
    	<div class="horiz-reveal">
        <div className="block loading align-center full-height full-width mt-4">
          <div className="loader text-center full-height full-width">
          </div>
        </div>
      </div>
      <div class="vert-reveal">
      </div>
	</div>
  );
};


export default PageRevealLoader;
