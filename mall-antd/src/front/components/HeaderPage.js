import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const HeaderPage = React.createClass({
  getInitialState() {
    return {
      current: 'index',
    };
  },
  handleClick(e) {
    this.setState({current: e.key});
  },
  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
        <Menu.Item key="index">
          <a href="#/" >首页</a>
        </Menu.Item>
        <Menu.Item key="product">
          <a href="#/product" >所有产品</a>
        </Menu.Item>
        <Menu.Item key="aboutus">
          <a href="#/aboutus">关于我们</a>
        </Menu.Item>
        <Menu.Item key="contactus">
          <a href="#/contactus">联系我们</a>
        </Menu.Item>
        <Menu.Item key="favorite">
          <Icon type="star-o" />收藏
        </Menu.Item>
      </Menu>
    );
  },
});

export default HeaderPage;
