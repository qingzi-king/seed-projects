import React, {Component, PropTypes} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';

import { Button, Modal } from 'antd';

import styles from './IndexPage.less';

//ant
const confirm = Modal.confirm;

//main
class Test extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    title: 'This is Test page！'
  };

  render() {

    return (
      <div style={{height:'100%'}}>
        <center>
          <div>{this.state.title}</div>
          <div><Link to="/"><Button type="primary">跳转至主页</Button></Link></div>
        </center>
        <QueueAnim className={styles['container']}>
          <div key="1" className={styles['box']} style={{background:'#CCC'}}>sdvs</div>
          <div key="2" className={styles['box']} style={{background:'#FC4A33'}}></div>
          <div key="3" className={styles['box']} style={{background:'#22F3FF'}}></div>
          <div key="4" className={styles['box']} style={{background:'#30FF26'}}></div>
          <div key="5" className={styles['box']} style={{background:'#CCC'}}>sdvs</div>
          <div key="6" className={styles['box']} style={{background:'#FC4A33'}}></div>
          <div key="7" className={styles['box']} style={{background:'#22F3FF'}}></div>
          <div key="8" className={styles['box']} style={{background:'#30FF26'}}></div>
        </QueueAnim>
      </div>
    );
  }
}

export default connect()(Test);
