import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './Menu.js';
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
        <img src="images/03.png" />
        <div>
          <div style={{float:'left',marginLeft:10}}>
            <h3>蓝山</h3>
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
  return (
    <div>
      <Row type="flex" justify="center">
        <Col style={{width:990,height:220,background:'#eeeeee'}}>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
        </Col>
      </Row>
    </div>
  );
  }
});

const ProductPage = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <ProductList/>
      <Line/>
      <ProductList/>
      <Line/>
      <ProductList/>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductPage);
