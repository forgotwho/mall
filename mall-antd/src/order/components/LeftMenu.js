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
        <SubMenu key="sub1" title={<span><span>订单管理</span></span>}>
          <Menu.Item key="1"><a href="#/">订单列表</a></Menu.Item>
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
