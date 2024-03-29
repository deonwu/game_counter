
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace, WingBlank, Tabs, ActionSheet, Modal, InputItem } from 'antd-mobile';
import { Button, List, Badge } from 'antd-mobile';

import MemberItem from "./MemberItem";
import ActivityItem from "./ActivityItem";
import { format } from "./utils";
import styles from '../index.less';

class MainFrame extends React.Component {
  
  state = {visibleNew: false, newUser: '', newMoney: 0, curFocus:''};
  
  onClose(){
    if(this.state.visibleNew) {
      this.setState({visibleNew: false});
    }
  }
  
  onFocus(name){
    this.setState({curFocus: name});
  }
  
  showModal(name){
    this.setState({visibleNew: name === 'New', newUser: ''});
  }
  
  onChangeName(val){
    this.setState({newUser: val});
  }
  
  onChangeMoney(val){
    this.setState({newMoney: val});
  }
  
  onClickNew(){
    const {dispatch} = this.props;
    const defaultMoney = this.state.newMoney || this.props.new_user;
  
    dispatch({type: "game/newUser",
              newName: this.state.newUser,
              newMoney: defaultMoney,
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
          if(buttonIndex === 0){
            dispatch({type: "game/clear"});
          }
        });
    };
    
    const defaultMoney = this.state.newMoney || this.props.new_user;
  
    let rowStyle = "";
    if(book.total < book.balance){
      rowStyle = styles.win;
    }else if(book.total >  book.balance){
      rowStyle = styles.loss;
    }
    
    return (
      <div className="flex-container">
        
        <div className="sub-title"></div>
        <WhiteSpace size="lg" />
  
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            <Button type="ghost" inline size="small" onClick={showActionSheet} >清除活动</Button>
          </Flex.Item>
          <Flex.Item align="center">
            <Button type="ghost" inline size="small" onClick={x=>this.showModal('New')}>增加成员</Button>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="lg" />
  
        <WingBlank className={styles.mainTabs}>
          <Flex justify="center" align="center">
            <Flex.Item>
              总本金: <b>{format(book.total)}</b>
            </Flex.Item>
            <Flex.Item className={rowStyle}>
              总余额: <b>{format(book.balance)}</b>
            </Flex.Item>
          </Flex>
    
          <WhiteSpace size="lg" />
    
          <Flex justify="center" align="center">
            <Flex.Item >
              总应收: <b>{format(book.income)}</b>
            </Flex.Item>
            <Flex.Item >
              总应付: <b>{format(book.pay)}</b>
            </Flex.Item>
          </Flex>
    
          <WhiteSpace size="lg" />
        </WingBlank>
  
        <Flex justify="center" align="center" className={styles.mainTabs}>
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
  
                { member_list.map(x=><MemberItem key={x.name} item={x} />) }
              </List>
            </Flex.Item>
            <Flex.Item align="center">
              <List className="my-list">
                <WhiteSpace size="sm" />
  
                { action_list.map(x=><ActivityItem key={x.key} item={x} />) }
              </List>
            </Flex.Item>
          </Tabs>
          
        </Flex>
  
        <Modal
          visible={this.state.visibleNew}
          onClose={x=>this.onClose()}
          closable
        >
          <List renderHeader={() => <div>增加活动成员</div>} >
            <List.Item>
              <InputItem
                type={"text"}
                defaultValue=""
                placeholder="成员名称"
                moneyKeyboardAlign="left"
                onChange={x=>this.onChangeName(x)}
                ref={el => {if(this.state.visibleNew && this.state.curFocus === 'name' && el) {el.focus();}}}
                onFocus={x=>this.onFocus("name")}
              >成员名称</InputItem>
            </List.Item>
            
            <List.Item>
              <InputItem
                type={"number"}
                defaultValue={defaultMoney}
                placeholder="初始金额"
                moneyKeyboardAlign="left"
                onChange={x=>this.onChangeMoney(x)}
                ref={el => {if(this.state.visibleNew && this.state.curFocus === 'money' && el) {el.focus();}}}
                onFocus={x=>this.onFocus("money")}
              >活动金额</InputItem>
            </List.Item>
            <List.Item>
              <Button type="ghost" onClick={x=>this.onClickNew()}>确认</Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
};

function mapStateToProps(state) {
  const { book, member_list, action_list, new_user } = state.game;
  return {
    book,
    member_list,
    action_list,
    new_user
  };
}

export default connect(mapStateToProps)(MainFrame);
