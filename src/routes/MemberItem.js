
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace, Modal, InputItem } from 'antd-mobile';
import { Button, List } from 'antd-mobile';

const Item = List.Item;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class MemberItem extends React.Component {
  state = {visibleTotal: false, visibleBalance: false};
  
  onClose(){
    if(this.state.visibleTotal || this.state.visibleBalance) {
      this.setState({visibleTotal: false, visibleBalance: false});
    }
  }
  
  showModal(name){
    this.setState({visibleTotal: name === 'Total', visibleBalance: name === 'Balance'});
  }
  
  render () {
    
    const {item} = this.props;
    
    
    return (
      <div className="flex-container">
        <Flex justify="center" align="center">
          <Flex.Item align="center">
            {item.name}
          </Flex.Item>
          <Flex.Item align="center">
            <Button size="small" inline onClick={x=>this.showModal('Total')}>{item.allMoney}</Button>
          </Flex.Item>
          <Flex.Item align="center">
            <Button nline size="small" onClick={x=>this.showModal('Balance')}>{item.balance}</Button>
          </Flex.Item>
          <Flex.Item align="center">
           <b>{item.loss}</b>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="sm" />
  
        <Modal
          popup
          visible={this.state.visibleTotal}
          onClose={x=>this.onClose()}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>增加活动金额</div>} className="popup-list">
            <List.Item>
              <InputItem
                type={"number"}
                defaultValue={100}
                placeholder="start from left"
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              >活动金额</InputItem>
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={x=>this.onClose('modal2')}>确认</Button>
            </List.Item>
          </List>
        </Modal>
  
        <Modal
          popup
          visible={this.state.visibleBalance}
          onClose={x=>this.onClose()}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>活动余额</div>} className="popup-list">
            <List.Item>
              <InputItem
                type={"number"}
                defaultValue={100}
                placeholder="start from left"
                moneyKeyboardAlign="left"
                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              >余额</InputItem>
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={x=>this.onClose('modal2')}>确认</Button>
            </List.Item>
          </List>
        </Modal>

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

export default connect(mapStateToProps)(MemberItem);
