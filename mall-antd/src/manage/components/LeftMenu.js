import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: '1',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><span>分类管理</span></span>}>
         <Menu.Item key="1"><a href="#/tag">分类列表</a></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><span>轮播管理</span></span>}>
         <Menu.Item key="2"><a href="#/banner">轮播列表</a></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><span>产品管理</span></span>}>
          <Menu.Item key="3"><a href="#/product">产品列表</a></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><span>订单管理</span></span>}>
          <Menu.Item key="4"><a href="#/order">订单列表</a></Menu.Item>
        </SubMenu>
      </Menu>
    );
  },
});

const LeftMenu = React.createClass({
  render() {
  return (
    <div>
      <Sider />
    </div>
  );
  }
});

export default LeftMenu;
