import React from 'react';


const NumberedListWithChecklist = props => {
  const data = props.data;

  return (
    <div className="stripe_6 clearfix">
      <div className="numberedListWithChecklist clearfix">
        <div className="two-col-flex full-width no-pad-m">
          <div className="col inner_2 ">
            <div className="numberedlist-container pr-2 pt-2 ">
              <h2 className="fontSize3 fontRegular pb-2">{data.numberedListHeading}</h2>
              {data.numberedList.map((numberedListItem, index) => {
                return (
                  <div className="list-item full-width pb-3 clearfix" key={index}>
                    <div className="step-counter">{index + 1}</div>
                    <div className="list-item-details pl-3">
                      {
                        (numberedListItem.heading !== "")
                        ? <h4 className="fontSize1 fontMedium pb-1 mb-0">{numberedListItem.heading}</h4>
                        : ''  
                      }
                      <p className="mt-0 mb-0 pb-0 pt-0 fontRegular">{numberedListItem.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col inner_2 grey1">
            <div className="checklist-container pt-2 ">
              <h2 className="fontSize3 fontRegular pb-2">{data.checklistHeading}</h2>
              <ul className="checklist">
                {data.checklist.map((checklistItem, index) => {
                  return (
                    <li className="fontSize2 checklist--item pb-3 clearfix" key={index}>
                      <div className="checklist--item_icon"></div>
                      <div className="checklist--item_content fontRegular fontSize2">{checklistItem.listItemText}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberedListWithChecklist;
