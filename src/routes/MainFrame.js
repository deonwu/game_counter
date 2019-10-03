
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace, Tabs } from 'antd-mobile';
import { Button, List, Badge } from 'antd-mobile';

import MemberItem from "./MemberItem";
import ActivityItem from "./ActivityItem";

const Item = List.Item;

class MainFrame extends React.Component {
  render () {
    const {book, member_list} = this.props;
    
    const tabs2 = [{ title: <Badge text={'3'}>活动成员</Badge> },
      { title: <Badge text={'3'}>资金记录</Badge> }];
    
    return (
      <div className="flex-container">
        
        <div className="sub-title"></div>
        <Flex justify="center" align="center">
          <Flex.Item align="center">简单活动记账器</Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
  
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            <Button type="primary" inline size="small" >清除 / C</Button>
          </Flex.Item>
          <Flex.Item align="center">
            <Button type="primary" inline size="small" >增加成员</Button>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
  
  
        <Flex justify="center" align="center">
          <Flex.Item>
            总本金: <b>{book.total}</b>
          </Flex.Item>
          <Flex.Item>
            收: <b>{book.win}</b>
          </Flex.Item>
          <Flex.Item>
            付: <b>{book.loss}</b>
          </Flex.Item>
        </Flex>
  
        <WhiteSpace size="lg" />
  
        <Flex justify="center" align="center">
          <Tabs tabs={tabs2}
                initialPage={1}
                renderTab={tab => <span>{tab.title}</span>}
          >
            <Flex.Item align="center">
              <List className="my-list">
                { member_list.map(x=><MemberItem item={x} />) }
              </List>
            </Flex.Item>
            <Flex.Item align="center">
              <List className="my-list">
                { member_list.map(x=><ActivityItem item={x} />) }
              </List>
            </Flex.Item>
          </Tabs>
          
        </Flex>
        
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { book, member_list } = state.game;
  return {
    book,
    member_list
  };
}

export default connect(mapStateToProps)(MainFrame);
