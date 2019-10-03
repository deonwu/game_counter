
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace } from 'antd-mobile';
import { Button, List } from 'antd-mobile';

const Item = List.Item;

class ActivityItem extends React.Component {
  render () {
    const book = this.props.book;
    
    return (
      <div className="flex-container">
        <Flex justify="center" align="center">
          <Flex.Item>
            长坤
          </Flex.Item>
          <Flex.Item>
            出: <b>{book.win}</b>
          </Flex.Item>
          <Flex.Item>
            时间: 09: 11
          </Flex.Item>
        </Flex>
      
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
