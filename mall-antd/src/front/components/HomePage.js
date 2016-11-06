import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './Menu.js';
import Banner from './Banner.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductItem = withRouter(React.createClass({
  handleClick(){
    this.props.router.push("/product/detail/1");
  },
  render() {
  return (
    <div>
      <Card style={{float:'left',width:'20%'}} bodyStyle={{ padding: 0 }} onClick={this.handleClick}>
        <img src={this.props.data.image} />
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <h3>{this.props.data.name}</h3>
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

const ProductList = React.createClass({
  render() {
    var itemList = this.props.data.list.map(function(data) {
      return (
        <ProductItem data={data}/>
      );
    });
  return (
    <div>
      <Row type="flex" justify="center">
        <Col style={{width:990,height:40,background:'#eeeeee'}}>
          <div style={{width:250,height:40,float:'left'}}>
            <img src={this.props.data.tag.image} />
          </div>
          <div style={{height:40,marginRight:15,float:'right'}}>
            <p style={{fontSize:16,padding:5}}>more ></p>
          </div>
        </Col>
        <Line/>
        <Col style={{width:990,height:220,background:'#eeeeee'}}>
          {itemList}
        </Col>
      </Row>
    </div>
  );
  }
});

var dataList1 = {
  tag:{name:"14.00mm",image:"images/02.png"},
  list:[
    {id: 1, name: "蓝山", image: "images/03.png",clols:["red","black"]},
    {id: 2, name: "星河", image: "images/03.png",clols:["red","black"]},
    {id: 3, name: "流沙", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "玛瑙", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "蜜恋", image: "images/03.png",clols:["red","black"]}
  ]
};

var dataList2 = {
  tag:{name:"14.00mm",image:"images/02.png"},
  list:[
    {id: 1, name: "蓝山2", image: "images/03.png",clols:["red","black"]},
    {id: 2, name: "星河2", image: "images/03.png",clols:["red","black"]},
    {id: 3, name: "流沙2", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "玛瑙2", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "蜜恋2", image: "images/03.png",clols:["red","black"]}
  ]
};

var dataList3 = {
  tag:{name:"14.00mm",image:"images/02.png"},
  list:[
    {id: 1, name: "蓝山3", image: "images/03.png",clols:["red","black"]},
    {id: 2, name: "星河3", image: "images/03.png",clols:["red","black"]},
    {id: 3, name: "流沙3", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "玛瑙3", image: "images/03.png",clols:["red","black"]},
    {id: 4, name: "蜜恋3", image: "images/03.png",clols:["red","black"]}
  ]
};

const HomePage = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={1}/>
      <Banner/>
      <Line/>
      <ProductList data={dataList1}/>
      <Line/>
      <ProductList data={dataList2}/>
      <Line/>
      <ProductList data={dataList3}/>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(HomePage);
