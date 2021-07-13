import React from 'react';


const BlogHero = props => {
  const datas = props.data;

  return (
    <section className="hero blog">
      <div className="hero--callout">
        <h1 className="fontBold fontSize5 pb-1 mb-0 mt-0">{datas.heading}</h1>
      </div>
      <div className="hero--image_blog" style={{backgroundImage: `url('${process.env.REACT_APP_S3_URL}${datas.image[0].filename}')`}}>
      </div>
    </section>
  );  
};

export default BlogHero;
