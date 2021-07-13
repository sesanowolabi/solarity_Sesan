import React from 'react';

const FullPageLoader = props => {

  return (
    <div className="offsetNav full-height full-width">
    	<div>
        <div className="block loading align-center full-height full-width">
          <div className="loader text-center full-height full-width">
            <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
              <circle id="loader-inner" cx="75" cy="75" r="60">
              </circle>
            </svg>
          </div>
        </div>
	   	</div>
	</div>
  );
};


export default FullPageLoader;
