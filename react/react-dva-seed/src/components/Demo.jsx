import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import moment from 'moment';
import _ from 'lodash';

import { Button, Spin, Anchor, Affix } from 'antd';
const AnchorLink = Anchor.Link;

import styles from './IndexPage.less';

// import MainLayout from '../layouts/mainLayout/MainLayout';
import SubUsers from './Users/SubUsers';

const Users = ({ location, dispatch, users, apps, loading }) => {

  const handleModifyUserName = (name) => {
    dispatch({
      type: 'users/edit', //users：表示models里面namespace的users，其中edit为其reducers中方法
      name: name,
    });
  }
  const handleSaveUserName = (name) => {
    dispatch({
      type: 'users/save',
      name: name,
    });
  }
  const handleChangeObject = () => {
    dispatch({
      type: 'users/objChange',
      payload: {
        numbers: 99
      }
    });
  }
  const handleChangeArray = () => {
    dispatch({
      type: 'users/arrChange',
      payload: {
        lists: [{name: '赵六',age: 14}]
      }
    });
  }
  const handleQuery = (tempProjectId) => {
    dispatch({
      type: 'users/query'
    });

    /*
    * dispatch(routerRedux.push({
    *   pathname: '/users',
    *   query: {
    *     projectId: tempProjectId
    *   }
    * }))
    * 
    * 最终的URL是/users?projectId=1
    */
  }

  const handleClearDatas = () => {
    dispatch({
      type: 'users/clearDatas'
    });
  }

  const handleSubmitToMe = (id, values) => {
    console.log(id, '子组件提交的数据：'+values)
    dispatch({
      type: 'users/objChange',
      payload: {
        numbers: values
      }
    });
  }

  return (
    <div style={{width:1024,margin:'10px auto'}}>

      <Spin spinning={users.loading} tip="Loading..." size="large" >

        <Link id="to-top" to="/"><Button type="primary">跳转至主页</Button></Link>
        <div className={styles.ck_Lists}>
          <p>姓名1：{apps.name}</p>
          <p>年龄1：{apps.age}</p>
          <p>地址1：{apps.addr}</p>
        </div>

        {
          loading ?
            '请求进行中....'
          :
            '请求已完成！'
        }

        <Affix style={{width:100}}>
          <Anchor>
            <AnchorLink href="#to-top" title="回到顶部" />
            <AnchorLink href="#to-bottom" title="回到底部" />
          </Anchor>
        </Affix>

        <div className={styles.ck_Lists}>
          <p>姓名2：{users.name} <Button size="small" type="primary" onClick={handleModifyUserName.bind(null, '轻姿王')}>更新</Button></p>
          <p>年龄2：{users.age} <Button size="small" type="primary" onClick={handleSaveUserName.bind(null, '轻姿王')}>更新</Button></p>
          <p>地址2：{users.addr}</p>
        </div>

        <ul>
          <li style={{marginTop:15,fontWeight:600}}>
            <p>商品名称：{users.goods.name}</p>
            <p>价格：{users.goods.price}</p>
            <p>数量：{users.goods.numbers}</p>
            <p>订单：{users.goods.showTotal(12)}</p>
          </li>
          <li>
            <p>
              <Button size="small" type="primary" onClick={handleChangeObject}>变更Obj</Button>
            </p>
          </li>
        </ul>

        <ul style={{marginTop:15}}>
          {
            users.lists.map((item, key) => {
              return (
                <li key={key}>{item.name} - {item.age}</li>
              )
            })
          }
          <li>
            <Button size="small" type="primary" onClick={handleChangeArray}>变更Arr</Button>
            <Button size="small" type="primary" onClick={handleQuery.bind(null, 1)} style={{marginLeft:5}}>获取数据</Button>
            <Button size="small" type="primary" onClick={handleClearDatas} style={{marginLeft:5}}>清除数据</Button>
          </li>
        </ul>

        {
          _.size(users.projectInfo.Users) > 0 ?
            <p>共有人员{users.projectInfo.Users.length}人</p>
          :
            null
        }

        {
          _.map(users.projectInfo.Users, (item, key) => {
            return (
              <p key={key}>{item.name}</p>
            )
          })
        }

        {/* ant锚点不可用 */}
        <div id="to-bottom"></div>

        <SubUsers onOk={handleSubmitToMe.bind(null, '66')} />

      </Spin>
    </div>
  );
}

// Users.propTypes = {
//   users: PropTypes.object,
//   apps: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func
// }

function mapStateToProps(state) {
  return {
    users: state.users,
    apps: state.apps,
    loading: state.loading.models.users
  };
}

export default connect(mapStateToProps)(Users)
