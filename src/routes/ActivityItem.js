
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace } from 'antd-mobile';
import { Button, List } from 'antd-mobile';
import moment from 'moment';
import { format } from "./utils";

const Item = List.Item;

class ActivityItem extends React.Component {
  render () {
    const item = this.props.item;
    
    return (
      <div className="flex-container">
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            {item.name}
          </Flex.Item>
          <Flex.Item >
            出: <b>{format(item.allMoney)}</b>
          </Flex.Item>
          <Flex.Item align="center">
            时间:  <b>{moment(item.time).format('HH:mm')}</b>
          </Flex.Item>
        </Flex>
  
        <WhiteSpace size="sm" />

      </div>
    )
  }
};

function mapStateToProps(state) {
  const { book } = state.game;
  return {
    book,
  };
}

export default connect(mapStateToProps)(ActivityItem);
