import React from 'react';

const TeamMember = props => {
  const data = props.data;
  return (
    <div className="grid1of3 noGutter inline-block inner_3">
    	<img className="round margin-auto-32" src={`${process.env.REACT_APP_S3_URL}` + data.image[0].filename} alt={data.image[0].title}/>
	   	<h2 className="fontSize1 colorBrandSecondary mt-0 mb-0">{data.teamMemberName}</h2>
	   	<h3 className="fontSize0 fontRegular colorBrandSecondary mt-0 mb-0">{data.teamMemberTitle}</h3>
	</div>
  );
};  

export default TeamMember;
