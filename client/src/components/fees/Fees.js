import React, { Component } from 'react';

import FeeSingle from './FeeSingle';

import SmallLoader from '../loaders/SmallLoader';

import BasicBlocks from '../content-blocks/basic-blocks/BasicBlocks';

// apollo
import { gql } from 'apollo-boost';
import {Query} from 'react-apollo';

//graphql query parts
import basicBlocksQuery from '../querys/BasicBlocks.js';


class Fees extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidUpdate(nextProps, nextState){

  }

  componentDidMount(){

  }



  render() {

    let FEE_BLOCKS_QUERY = gql`
    {
      entry:entries(section:[feesPage]){
        ...on FeesPage{
          ${basicBlocksQuery.basicBlocksQuery}
        }
      }

    }

    `;

    let cats = this.props.feeCats;

    return (
      <div className="offsetNav grey1">
        <div className="container--md">
          <h1 className="fontSize5 fontBold pt-4 text-center">Consumer Fees</h1>

        {cats.map((l,i)=>{
          let feesList = gql`
          {
            feeList:entries(section:[fees] relatedTo:{element:${cats[i].id}}){
              ...on Fees{
                feeName
                feeDescription{
                  content
                }
                feeCost{
                  content
                }

              }
            }
          }
          `;
          return(
            <div className="fee-group mb-4 clearfix" key={i}>
              <h2>{cats[i].title}</h2>
              <Query client={this.props.client} query={feesList}>
                {({ loading, error, data }) => {
                  //console.log(data.feeList);
                  if (loading) return <SmallLoader />;
                  if (error) return '';
                  return (
                    <div>
                      {data.feeList.map((list, index)=>{
                        return(
                          <FeeSingle key={'fee'+index} data={data.feeList[index]} />
                        );
                      })}
                    </div>
                  );
                }}
              </Query>

            </div>
            );
        })}

        <div className="feeBlocks">
          <Query client={this.props.client} query={FEE_BLOCKS_QUERY}>
            {({ loading, error, data }) => {
              console.log(data);
              if (loading) return '';
              if (error) return '';
              return (
                <BasicBlocks data={data.entry[0].basicBlocks} loading={loading} />
                //<div></div>
              );
            }}
          </Query>
        </div>
        </div>
      </div>
    );
  }
}

export default Fees;
