
import React from "react";
import { connect } from 'dva';

import { Flex, WhiteSpace, Modal, InputItem } from 'antd-mobile';
import { Button, List } from 'antd-mobile';
import { format } from "./utils";

class MemberItem extends React.Component {
  
  onUpdateMoney(){
    const {dispatch, item, last_total} = this.props;
  
    const title = `${item.name} - 增加活动金额`;
    Modal.prompt(title, '', [
      { text: '取消' },
      { text: '确认增加', onPress: value => {
        dispatch({type: "game/newMoney",
          newName: this.props.item.name,
          newMoney: value,
          cb: ()=>{}
        });
      
      }
      },
    ], 'default', last_total || "100")
  }
  
  onUpdateBalance(){
    const {dispatch, item} = this.props;
  
    const title = `${item.name} - 修改余额`;
    Modal.prompt(title, '', [
      { text: '取消' },
      { text: '确认修改', onPress: value => {
        dispatch({type: "game/newBalance",
          newName: this.props.item.name,
          newMoney: value,
          cb: ()=>{}
        });
      
      }
      },
    ], 'default', item.balance);
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
            <Button size="small" onClick={x=>this.onUpdateMoney()}>{format(item.allMoney)}</Button>
          </Flex.Item>
          <Flex.Item align="center">
            <Button size="small" onClick={x=>this.onUpdateBalance()}>{format(item.balance)}</Button>
          </Flex.Item>
          <Flex.Item align="right">
           <b>{format(item.loss)}&nbsp;&nbsp;</b>
          </Flex.Item>
        </Flex>
        <WhiteSpace size="sm" />

      </div>
    )
  }
};

function mapStateToProps(state) {
  const { book, last_total } = state.game;
  return {
    book,
    last_total
  };
}

export default connect(mapStateToProps)(MemberItem);
