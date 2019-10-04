
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace, WingBlank, Tabs, ActionSheet, Modal, InputItem } from 'antd-mobile';
import { Button, List, Badge } from 'antd-mobile';

import MemberItem from "./MemberItem";
import ActivityItem from "./ActivityItem";
import '../index.css';

const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class MainFrame extends React.Component {
  
  state = {visibleNew: false, newUser: '', newMoney: '100'};
  
  onClose(){
    if(this.state.visibleNew) {
      this.setState({visibleNew: false});
    }
  }
  
  showModal(name){
    this.setState({visibleNew: name === 'New'});
  }
  
  onChangeName(val){
    this.setState({newUser: val});
  }
  
  onChangeMoney(val){
    this.setState({newMoney: val});
  }
  
  onClickNew(){
    const {dispatch} = this.props;
    //console.log("xxx", this.state.newUser, ",,", this.state.newMoney);
  
    dispatch({type: "game/newUser",
              newName: this.state.newUser,
              newMoney: this.state.newMoney,
              cb: ()=>{this.onClose()}
    });
  }
  
  
  render () {
    const {book, member_list, action_list, dispatch} = this.props;
    
    const tabs2 = [{ title: <Badge text={member_list.length}>活动成员</Badge> },
      { title: <Badge text={action_list.length}>资金记录</Badge> }];
  
  
    const showActionSheet = () => {
      const BUTTONS = ['清空记录', '取消'];
      ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: '确认清空活动资金记录？',
          maskClosable: true,
          'data-seed': 'logId',
        },
        (buttonIndex) => {
          if(buttonIndex == 0){
            dispatch({type: "game/clear"});
          }
        });
    };
    
    return (
      <div className="flex-container">
        
        <div className="sub-title"></div>
        <Flex justify="center" align="center">
          <Flex.Item align="center">简单活动记账器</Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
  
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            <Button type="primary" inline size="small" onClick={showActionSheet} >清除 / C</Button>
          </Flex.Item>
          <Flex.Item align="center">
            <Button type="primary" inline size="small" onClick={x=>this.showModal('New')}>增加成员</Button>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
  
        <WingBlank>
          <Flex justify="center" align="center">
            <Flex.Item>
              总本金: <b>{book.total}</b>
            </Flex.Item>
            <Flex.Item>
              总余额: <b>{book.balance}</b>
            </Flex.Item>
          </Flex>
    
          <WhiteSpace size="lg" />
    
          <Flex justify="center" align="center">
            <Flex.Item >
              总应收: <b>{book.income}</b>
            </Flex.Item>
            <Flex.Item >
              总应付: <b>{book.pay}</b>
            </Flex.Item>
          </Flex>
    
          <WhiteSpace size="lg" />
        </WingBlank>
  
        <Flex justify="center" align="center">
          <Tabs tabs={tabs2}
                initialPage={0}
                renderTab={tab => <span>{tab.title}</span>}
          >
            <Flex.Item align="center">
              <List className="my-list">
                <WhiteSpace size="sm" />
  
                <Flex justify="center" align="center">
                  <Flex.Item align="center">
                    名称
                  </Flex.Item>
                  <Flex.Item align="center">
                    本金累计
                  </Flex.Item>
                  <Flex.Item align="center">
                    余额
                  </Flex.Item>
                  <Flex.Item align="center">
                    最终结余
                  </Flex.Item>
                </Flex>
                <WhiteSpace size="sm" />
  
                { member_list.map(x=><MemberItem item={x} />) }
              </List>
            </Flex.Item>
            <Flex.Item align="center">
              <List className="my-list">
                <WhiteSpace size="sm" />
  
                { action_list.map(x=><ActivityItem item={x} />) }
              </List>
            </Flex.Item>
          </Tabs>
          
        </Flex>
  
        <Modal
          popup
          visible={this.state.visibleNew}
          onClose={x=>this.onClose()}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>增加活动成员</div>} className="popup-list">
            <List.Item>
              <InputItem
                type={"text"}
                defaultValue={this.state.newUser}
                placeholder="成员名称"
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                onChange={x=>this.onChangeName(x)}
              >成员名称</InputItem>
            </List.Item>
            
            <List.Item>
              <InputItem
                type={"number"}
                defaultValue={this.state.newMoney}
                placeholder="初始金额"
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                onChange={x=>this.onChangeMoney(x)}
              >活动金额</InputItem>
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={x=>this.onClickNew()}>确认</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { book, member_list, action_list } = state.game;
  return {
    book,
    member_list,
    action_list
  };
}

export default connect(mapStateToProps)(MainFrame);
