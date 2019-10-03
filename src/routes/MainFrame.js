
import React from "react";
import { Flex, WhiteSpace } from 'antd-mobile';
import { Button, List } from 'antd-mobile';

const Item = List.Item;

class MainFrame extends React.Component {
  render () {
    const match = this.props.match;
    
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
  
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            <List renderHeader={() => '活动成员列表'} className="my-list">
              <Item extra={'extra content'}>Title</Item>
              <Item extra={'extra content'}>Title</Item>
    
              <Item extra={'extra content'}>Title</Item>
              <Item extra={'extra content'}>Title</Item>
  
            </List>
          </Flex.Item>
        </Flex>
        
      </div>
    )
  }
};

export default MainFrame;
