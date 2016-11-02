import React from 'react';
import ReactDOM from 'react-dom';
import '../../index.css';
import { Input } from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderPage = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
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
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <a href="#/" >首页</a>
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />公司介绍
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />全部商品</span>}>
          <MenuItemGroup title="直径">
            <Menu.Item key="setting:1">14mm</Menu.Item>
            <Menu.Item key="setting:2">16mm</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="颜色">
            <Menu.Item key="setting:3">白色</Menu.Item>
            <Menu.Item key="setting:4">黑色</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="其它">
            <Menu.Item key="setting:5">混搭</Menu.Item>
            <Menu.Item key="setting:6">经典</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="#/">联系我们</a>
        </Menu.Item>
        <div style={{float:'right',margin:10}}>
          <Input size="large" placeholder="请输入关键字搜索" />
        </div>
      </Menu>
    );
  },
});

export default HeaderPage;
