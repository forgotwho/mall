import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './MenuBar.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductItem = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/"+this.props.data.id);
  },
  render() {
  return (
    <div>
      <Card style={{float:'left',width:'50%',background:'#FFFFFF'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <div style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}} >
          <img width="100%" height="100%" src={this.props.data.image} />
        </div>
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <p style={{fontSize:28}}>{this.props.data.name}</p>
          </div>
          <div style={{float:'right',width:60,marginRight:10,marginTop:5}}>
            <div style={{float:'left',width:20,height:20,background:'red'}}></div>
            <div style={{float:'right',width:20,height:20,background:'black'}}></div>
          </div>
        </div>
      </Card>
    </div>
  );
  }
}));

const ProductItem2 = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/"+this.props.data.id);
  },
  render() {
  return (
    <div>
      <Card style={{float:'left',width:'20%',background:'#FFFFFF'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <div style={{marginTop:45,marginBottom:45,marginLeft:55,marginRight:55}} >
          <img width="100%" height="100%" src={this.props.data.image} />
        </div>
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <p style={{fontSize:16}}>{this.props.data.name}</p>
          </div>
          <div style={{float:'right',width:30,marginRight:10,marginTop:5}}>
            <div style={{float:'left',width:10,height:10,background:'red'}}></div>
            <div style={{float:'right',width:10,height:10,background:'black'}}></div>
          </div>
        </div>
      </Card>
    </div>
  );
  }
}));

var dataList1 = {
  tag:{name:"14.00mm",image:"images/02.png"},
  list:[
    {id: 1, name: "蓝山", image: "images/21.png",clols:["red","black"]},
    {id: 2, name: "星河", image: "images/22.png",clols:["red","black"]},
    {id: 3, name: "流沙", image: "images/23.png",clols:["red","black"]},
    {id: 4, name: "玛瑙", image: "images/24.png",clols:["red","black"]},
    {id: 5, name: "蜜恋", image: "images/25.png",clols:["red","black"]},
    {id: 6, name: "蓝山2", image: "images/21.png",clols:["red","black"]},
    {id: 7, name: "星河2", image: "images/22.png",clols:["red","black"]},
    {id: 8, name: "流沙2", image: "images/23.png",clols:["red","black"]},
    {id: 9, name: "玛瑙2", image: "images/24.png",clols:["red","black"]},
    {id: 10, name: "蜜恋2", image: "images/25.png",clols:["red","black"]},
    {id: 11, name: "蓝山3", image: "images/21.png",clols:["red","black"]},
    {id: 12, name: "星河3", image: "images/22.png",clols:["red","black"]},
    {id: 13, name: "流沙3", image: "images/23.png",clols:["red","black"]},
    {id: 14, name: "玛瑙3", image: "images/24.png",clols:["red","black"]},
    {id: 15, name: "蜜恋3", image: "images/25.png",clols:["red","black"]}
  ]
};

const ProductList = withRouter(React.createClass({
  render() {
    var itemList = this.props.data.list.map(function(data) {
      return (
        <ProductItem data={data} key={data.id}/>
      );
    });
    var itemList2 = this.props.data.list.map(function(data) {
      return (
        <ProductItem2 data={data} key={data.id}/>
      );
    });
    var searchText = "";
    if(this.props.params.name!=null){
      searchText = "搜索："+"\""+this.props.params.name+"\"";
    }
  return (
    <div>
      <Row type="flex" justify="center">
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:990}}>
          <div style={{marginBottom:20,float:'left'}}>
            <p style={{fontSize:24}}>{searchText}</p>
          </div>
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{width:990}}>
          <div style={{width:250,marginBottom:20,float:'left'}}>
            <p style={{fontSize:16}}>{searchText}</p>
          </div>
        </Col>
        <Col xs={{span:24}} sm={{span:24}} lg={{span:0}} md={{span:0}} style={{width:990}}>
          {itemList}
        </Col>
        <Col lg={{span:24}} md={{span:24}} xs={{span:0}} sm={{span:0}} style={{width:990}}>
          {itemList2}
        </Col>
      </Row>
    </div>
  );
  }
}));

const ProductPage = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <ProductList data={dataList1}/>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductPage);
