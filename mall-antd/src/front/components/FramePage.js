import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

var dataList = [
  {id: 1, name: "首页", href: "#/"},
  {id: 2, name: "所有产品", href: "#/product"},
  {id: 3, name: "关于我们", href: "#/about"},
  {id: 4, name: "联系我们", href: "#/contact"}
];

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
    var menuId = this.props.menuId;
    var menuNodes2 = dataList.map(function(data) {
      if(data.id==menuId){
        return (
        <div key={data.id} style={{float:'left',width:'100%',height:100,padding:30,background:"#999999"}}>
          <a style={{fontSize:28,color:'#f7f7f7'}} href={data.href}>{data.name}</a>
        </div>
      );
      }else{
        return (
        <div key={data.id} style={{float:'left',width:'100%',height:100,padding:30,background:"#f7f7f7"}}>
          <a style={{fontSize:28,color:'#666666'}} href={data.href}>{data.name}</a>
        </div>
      );
      }
    });
    return (
      <div>
        <div id="menuItem" style={{float:'none',display:'none',width:'100%'}}>
          {menuNodes2}
        </div>
      </div>
    );
  },
});

const FramePage = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Row>
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}}>
          <Row>
            <Col style={{float:'left'}} id="leftMenu">
              <Sider menuId={1}/>
            </Col>
            <Col style={{float:'right'}} id="rightContent"> 
              {this.props.children}
            </Col>
          </Row>
        </Col>
        <Col xs={{span:0}} sm={{span:0}} lg={{span:24}} md={{span:24}}>
          {this.props.children}
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(FramePage);
