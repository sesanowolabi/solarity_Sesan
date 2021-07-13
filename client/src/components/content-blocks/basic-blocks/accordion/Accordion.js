import React from 'react';

import AccordionItem from './AccordionItem';

const Accordion = props => {
  const data = props.data;

  return (

    <ul className="accordion stripe-lrg">
      {data.item.map((block, index) => {

          return (
            <AccordionItem props={block} key={index} index={index} />
          );
      })}
    </ul>
  );
};

export default Accordion;
