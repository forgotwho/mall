import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'antd';
import { Icon } from 'antd';
import { Input } from 'antd';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { withRouter } from 'react-router';

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
    return (
      <Menu onClick={this.handleClick}
        style={{ width: '100%',float:'left',height:800 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu key="sub1" title={<div style={{fontSize:38}}>首页</div>}>
        </SubMenu>
        <SubMenu key="sub2" title={<div style={{fontSize:38}}>所有产品</div>}>
        </SubMenu>
        <SubMenu key="sub4" title={<div style={{fontSize:38}}>关于我们</div>}>
        </SubMenu>
        <SubMenu key="sub5" title={<div style={{fontSize:38}}>联系我们</div>}>
        </SubMenu>
      </Menu>
    );
  },
});

const MenuBar = React.createClass({
  getInitialState() {
    return {
      show: false,
      keyword:''
    };
  },
  handleMore(value) {
    event.preventDefault();
  },
  handleDetail(value) {
    event.preventDefault();
  },
  handleClick() {
    if(this.props.load!=null){
      this.props.load(" ");
    }
  },
  handleSearch() {
    if(this.props.load!=null){
      var keyword = document.getElementById("keyword").value;
      if(keyword==""){
        keyword=" ";
      }
      this.props.load(keyword);
      this.setState({keyword:keyword});
    }else{
      var keyword = document.getElementById("keyword").value;
      this.setState({keyword:keyword});
      this.props.router.push("/product?name="+keyword);
    }
  },
  handleMenu() {
    var menuItem = document.getElementById('menuItem');
    if(menuItem.style.display==""){
      menuItem.style.display="none";
    }else{
      menuItem.style.display="";
    }
  },
  render() {
    var menuId = this.props.menuId;
    var handleClick = this.handleClick;
    var menuNodes = dataList.map(function(data) {
      if(data.id==menuId){
        return (
        <div key={data.id} style={{float:'left',width:'20%',height:'100%',padding:8,background:"#999999"}}>
          <a style={{fontSize:16,color:'#f7f7f7'}} href={data.href} onClick={handleClick}>{data.name}</a>
        </div>
      );
      }else{
        return (
        <div key={data.id} style={{float:'left',width:'20%',height:'100%',padding:8,background:"#f7f7f7"}}>
          <a style={{fontSize:16,color:'#666666'}} href={data.href} onClick={handleClick}>{data.name}</a>
        </div>
      );
      }
    });
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
    <div style={{}}>
      <Row type="flex" justify="center" style={{background:'#f7f7f7'}}>
        <Col xs={{span:0}} sm={{span:0}} md={{span:24}} lg={{span:24}} style={{minWidth:990,width:990,height:42,textAlign:'center'}}>
          {menuNodes}
          <div style={{float:'right',textAlign:'right',width:'20%',height:'100%',padding:8,background:'#f7f7f7'}}>
            <a style={{fontSize:16,color:'#666666'}} href="#/">收藏</a>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} md={{span:0}} lg={{span:0}} style={{width:'100%',padding:10}}>
          <div style={{}}>
            <div style={{float:'left',marginRight:20,width:'20%'}}>
              <img width="100" height="100" src="images/menu.png"  onClick={this.handleMenu}/>
            </div>
            <div style={{float:'left',marginRight:0,width:'60%'}}>
              <Input id="keyword" size="large" style={{borderRadius:0,height:100,width:'100%'}} defaultValue={this.state.keyword}/>
            </div>
            <div style={{float:'right',width:100,marginRight:0,width:'15%'}}>
              <img src="images/04.png" height="100" onClick={this.handleSearch}/>
            </div>
          </div>
          <div id="menuItem" style={{display:'none'}}>
            {menuNodes2}
          </div>
        </Col>
      </Row>
    </div>
  );
  }
});

export default withRouter(MenuBar);
