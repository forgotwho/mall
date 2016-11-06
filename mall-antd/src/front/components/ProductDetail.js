import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Col, Row } from 'antd';
import { Carousel } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router';

import Header from './Header.js';
import Menu from './Menu.js';
import Line from './Line.js';
import Footer from './Footer.js';

const ProductDetail = React.createClass({
  render() {
  return (
    <div style={{minWidth:990}}>
      <Header/>
      <Menu menuId={2}/>
      <Line/>
      <Row type="flex" justify="center">
        <Col style={{width:990,textAlign:'left'}}>
          <div style={{float:'left',border:1}}>
            <img src="images/10.png" />
            <div style={{marginLeft:60,marginRight:60,marginTop:10,marginBottom:10}}>
              <img style={{padding:5}} src="images/11.png" />
              <img style={{padding:5}} src="images/11.png" />
              <img style={{padding:5}} src="images/11.png" />
              <img style={{padding:5}} src="images/11.png" />
            </div>
          </div>
          <div style={{float:'left',marginLeft:20,marginTop:100,color:'#666666',fontSize:16}}>
            <p>产品名称：<span style={{marginLeft:5}}>蓝山</span></p>
            <p>可选颜色：</p>
            <p>直径：<span style={{marginLeft:5}}>14.00 mm</span></p>
            <p>基弧：<span style={{marginLeft:5}}>8.6</span></p>
            <p>含水量：<span style={{marginLeft:5}}>42.5%</span></p>
            <p>产地：<span style={{marginLeft:5}}>韩国</span></p>
            <p>佩戴周期：<span style={{marginLeft:5}}>1年</span></p>
          </div>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col style={{width:990,textAlign:'left'}}>
          <img src="images/12.png" />
        </Col>
      </Row>
      <Line/>
      <Footer/>
    </div>
  );
  }
});

export default withRouter(ProductDetail);
